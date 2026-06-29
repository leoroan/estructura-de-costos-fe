import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();


  useEffect(() => {
    if (user && (user.rol === "DIRECTOR" || user.rol === "ADMINISTRATIVO")) {
      navigate("/direccion", { replace: true });
    }
  }, [user, navigate]);

  // Mientras redirige o carga config
  if (!user || user.rol !== "ADMIN") {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando…</span>
        </div>
      </div>
    );
  }

  // Vista exclusiva para ADMIN
  return (
    <div className="container py-5">
      {/* Bienvenida */}
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold">
            {loadingConfig ? "Bienvenido" : `${config.nombre}`}
          </h2>
          <p className="text-muted mb-0">
            Panel de administración general del sistema
          </p>
          <hr />
        </div>
      </div>

      {/* Tarjetas de acceso rápido */}

      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="card h-100 border-0 shadow-sm"
            style={{ borderLeft: `4px solid ${config.colorPrimario}` }}
          >
            <div className="card-body">
              <h6 className="card-title text-uppercase text-muted small fw-bold mb-3">
                Dashboard Admin
              </h6>
              <p className="card-text text-muted small">
                Vista general del sistema: estadísticas, estado de módulos y actividad reciente.
              </p>
              <a
                href="/admin"
                className="btn btn-sm text-white"
                style={{ backgroundColor: config.colorPrimario }}
                onClick={(e) => { e.preventDefault(); navigate("/admin"); }}
              >
                Ir al Dashboard
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm" style={{ borderLeft: "4px solid #198754" }}>
            <div className="card-body">
              <h6 className="card-title text-uppercase text-muted small fw-bold mb-3">
                Usuarios
              </h6>
              <p className="card-text text-muted small">
                Gestión de usuarios del sistema: creación, roles y asignación de direcciones.
              </p>
              <a
                href="/admin/usuarios"
                className="btn btn-sm btn-success text-white"
                onClick={(e) => { e.preventDefault(); navigate("/admin/usuarios"); }}
              >
                Gestionar Usuarios
              </a>
            </div>
          </div>
        </div>

        {user?.rol !== "ADMIN" &&
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm" style={{ borderLeft: "4px solid #fd7e14" }}>
              <div className="card-body">
                <h6 className="card-title text-uppercase text-muted small fw-bold mb-3">
                  Mi Dirección
                </h6>
                <p className="card-text text-muted small">
                  Ver la vista de dirección asignada. El ADMIN puede acceder a cualquier dirección.
                </p>
                <a
                  href="/direccion"
                  className="btn btn-sm btn-warning text-white"
                  onClick={(e) => { e.preventDefault(); navigate("/direccion"); }}
                >
                  Ver Dirección
                </a>
              </div>
            </div>
          </div>}

      </div>
    </div>
  );
}
