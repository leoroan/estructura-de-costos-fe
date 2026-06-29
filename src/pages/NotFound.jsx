/**
 * NotFound — página 404.
 */

import { Link } from "react-router-dom";

export default function NotFound() {

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold">
          404
        </h1>
        <h4 className="fw-semibold text-secondary mb-3">Página no encontrada</h4>
        <p className="text-muted mb-4">
          La ruta que buscás no existe o no tenés permisos para acceder.
        </p>
        <Link
          to="/"
          className="btn text-white"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
