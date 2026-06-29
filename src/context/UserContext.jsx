import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

const STORAGE_KEY = "userAuthData";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar: intentar restaurar sesión desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const decoded = jwtDecode(parsed.token);

        // Validar expiración
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
          // Token expirado → limpiar
          localStorage.removeItem(STORAGE_KEY);
        } else {
          setUser({ ...decoded, token: parsed.token });
        }
      }
    } catch {
      // Token corrupto o inválido
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * login — recibe el token JWT del backend, lo decodifica y persiste.
   * @param {string} token - JWT recibido del endpoint de sesión
   */
  const login = useCallback((token) => {
    const decoded = jwtDecode(token);
    const authData = { token };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
    // El user tendrá todos los claims del JWT + el token crudo
    setUser({ ...decoded, token });
  }, []);

  /** logout — limpia estado y localStorage */
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  /**
   * updateUser — permite actualizar campos del usuario en contexto
   * sin re-login (ej: foto de perfil, nombre)
   */
  const updateUser = useCallback((updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

/** Hook de acceso rápido al contexto */
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de UserProvider");
  return ctx;
}
