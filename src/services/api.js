/**
 * Capa de servicios centralizada.
 * Todas las llamadas HTTP pasan por fetchApi para garantizar
 * inyección de token, manejo de errores uniforme y consistencia.
 *
 * Convención del backend: las respuestas exitosas envuelven los datos
 * en { payload: <datos> }. fetchApi desenvuelve automáticamente el payload.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8085/api";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000; // ms

export async function fetchApi(endpoint, options = {}) {
  const {
    method = "GET",
    body = null,
    params = {},
    responseType = "json",
    headers: extraHeaders = {},
    timeout = API_TIMEOUT,
  } = options;

  // Construir query string (soporta arrays: ?ids=1&ids=2)
  const queryString = buildQueryString(params);
  const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

  // Inyectar token Bearer desde localStorage
  const storedAuth = localStorage.getItem("userAuthData");
  const token = storedAuth ? JSON.parse(storedAuth)?.token : null;

  const headers = { ...extraHeaders };

  // Solo agregar Content-Type para JSON (no FormData)
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions = { method, headers };

  // AbortController para timeout / cancelación
  const controller = new AbortController();
  fetchOptions.signal = controller.signal;

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  if (body) {
    fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    // Manejar respuesta blob (descargas)
    if (responseType === "blob") {
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw await buildError(response, data);
      }
      clearTimeout(timeoutId);
      return await response.blob();
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Manejo simple de 401: limpiar auth y avisar a la app
      if (response.status === 401) {
        try { localStorage.removeItem("userAuthData"); } catch (e) { /* noop */ }
        try { window.dispatchEvent(new Event("auth:expired")); } catch (e) { /* noop */ }
      }

      const error = await buildError(response, data);
      throw error;
    }

    clearTimeout(timeoutId);

    // El backend devuelve { payload: <datos> } → desenvolver automáticamente
    return data?.payload !== undefined ? data.payload : data;

  } catch (err) {
    clearTimeout(timeoutId);

    // Abort (timeout)
    if (err.name === "AbortError") {
      const toErr = new Error("Request timed out");
      toErr.statusCode = 0;
      toErr.code = "TIMEOUT";
      throw toErr;
    }

    // Re-lanzar errores ya formateados
    if (err.statusCode) throw err;

    const netError = new Error("Error de red o servidor no disponible, intenta más tarde. 😞");
    netError.statusCode = 0;
    netError.code = "NETWORK_ERROR";
    throw netError;
  }
}

/** Convierte objeto de params en query string, soporta arrays */
function buildQueryString(params) {
  const parts = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`));
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return parts.join("&");
}

async function buildError(response, parsedData = null) {
  const error = new Error("Error en la solicitud");
  error.statusCode = response.status;

  // Usar data ya parseada o intentar parsear de respuesta
  let body = parsedData;
  if (!body) {
    try {
      body = await response.clone().json().catch(() => null);
    } catch (e) {
      // ignore
    }
  }

  if (body) {
    // Buscar mensaje en varias niveles de anidación:
    // - body.message
    // - body.payload.message
    // - body.body.message (backend nesting)
    // - body.error
    const message =
      body.message ||
      body.payload?.message ||
      body.body?.message ||
      body.error?.message ||
      body.error ||
      error.message;

    error.message = message;
    error.code = body.code || body.body?.code || null;
    error.response = { data: body };
  }

  return error;
}

/* ──────────────────────────────────────────
   API de sesión / autenticación
────────────────────────────────────────── */
export const sessionApi = {
  login: (credentials) =>
    fetchApi("/session/login", { method: "POST", body: credentials }),
  logout: () =>
    fetchApi("/session/logout", { method: "POST" }),
  me: () =>
    fetchApi("/session/me"),
};

/* ──────────────────────────────────────────
   API de usuarios
────────────────────────────────────────── */
export const usuariosApi = {
  getAll: (params) => fetchApi("/usuario", { params }),
  getById: (id, queryParams = {}) => fetchApi(`/usuario/${id}`, { params: queryParams }),
  create: (data, options = {}) => {
    const { params = {} } = options;
    return fetchApi("/usuario/nuevo", { method: "POST", body: data, params })
  },
  update: (id, data) => fetchApi(`/usuario/${id}`, { method: "PUT", body: data }),
  delete: (id) => fetchApi(`/usuario/${id}`, { method: "DELETE" }),
  verificarEmail: (token) => fetchApi("/usuario/verificar-email", { method: "POST", params: { token } }),
  reenviarVerificacion: (email) => fetchApi("/usuario/reenviar-verificacion", { method: "POST", body: { email } }),
  solicitarRecuperacion: (email) => fetchApi("/usuario/recuperar-contrasenia", { method: "POST", body: { email } }),
  cambiarContrasenia: (token, password) => fetchApi("/usuario/cambiar-contrasenia", { method: "POST", body: { password }, params: { token } }),

  getDirecciones: (userId) => usuariosApi.getById(userId, { scope: 'withDireccionScope' }),
  assignDireccion: (userId, direccionId) => fetchApi(`/usuario/${userId}/direcciones/${direccionId}`, { method: "POST", }),
  removeDireccion: (userId, direccionId) => fetchApi(`/usuario/${userId}/direcciones/${direccionId}`, { method: "DELETE", }),

  getPermisos: (userId) => usuariosApi.getById(userId, { scope: 'withPermisosScope' }),
  assignPermiso: (userId, permisoIds) => fetchApi(`/usuario/agregar-permisos/${userId}`, {
    method: "POST", body: { permisoIds: Array.isArray(permisoIds) ? permisoIds : [permisoIds] }
  }),
  removePermiso: (userId, permisoIds) => fetchApi(`/usuario/remover-permisos/${userId}`, { method: "DELETE", body: { permisoIds: Array.isArray(permisoIds) ? permisoIds : [permisoIds] } }
  ),
};
