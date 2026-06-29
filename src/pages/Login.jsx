import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { sessionApi } from "../services/api.js";
import Swal from "sweetalert2";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const primaryColor = config?.colorPrimario || "#003366";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      Swal.fire({ icon: "warning", title: "Campos requeridos", text: "Completá nombre de usuario y contraseña." });
      return;
    }

    try {
      setLoading(true);
      const response = await sessionApi.login({
        username: form.username,
        password: form.password,
      });

      if (!response?.token) throw new Error("Respuesta inválida del servidor.");

      login(response.token);
      navigate("/");
    } catch (err) {
      const msg =
        err.statusCode === 401
          ? "Credenciales incorrectas. Verificá tu nombre de usuario/email o contraseña para ingresar."
          : err.message || "Error al iniciar sesión. Intentá nuevamente.";

      Swal.fire({ icon: "error", title: "Error de acceso", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5 col-xl-4">
            <div className="auth-card card border-0 shadow-sm overflow-hidden">
              <div
                className="auth-card-header card-header text-white text-center py-4"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, #0d6efd)` }}
              >
                <div className="auth-icon mx-auto mb-3">
                  {config.logoUrl ? (
                    <img src={config.logoUrl} alt={config.sigla} height="42" />
                  ) : (
                    <i className="bi bi-building-lock fs-2"></i>
                  )}
                </div>
                <h1 className="h4 mb-1">Acceso al Sistema</h1>
                <p className="mb-0 opacity-75 small">
                  {config.nombre || "Sistema interno institucional"}
                </p>
              </div>

              <div className="card-body p-4 p-lg-5">
                <div className="text-center mb-4">
                  <span className="badge text-bg-light border">
                    <i className="bi bi-shield-check me-1"></i>
                    Uso exclusivo interno
                  </span>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Nombre de usuario
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="usuario"
                        value={form.username}
                        onChange={handleChange}
                        autoComplete="username"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  <div className="text-end mb-4">
                    <Link to="/restaurar-password" className="auth-link small text-decoration-none fw-semibold">
                      <i className="bi bi-question-circle me-1"></i>
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        Ingresando…
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-1"></i>
                        Ingresar
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="card-footer bg-white text-center text-muted small py-3">
                <i className="bi bi-info-circle me-1"></i>
                Sistema de uso exclusivo interno del organismo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
