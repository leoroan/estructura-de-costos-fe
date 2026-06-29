import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";

export function AppRoute() {
  const { user } = useUser();

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />

      {/* <Route
        path="/verificacion-view"
        element={<VerificacionEmail />}
      /> */}

      {/* <Route
        path="/restaurar-password"
        element={<RestaurarPassword />}
      /> */}

      {/* Ruta home — todos los roles autenticados */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Dirección — DIRECTOR y ADMINISTRATIVO (y ADMIN puede verla también) */}
      {/* <Route
        path="/direccion"
        element={
          <ProtectedRoute requiredRoles={["ADMIN", "DIRECTOR", "ADMINISTRATIVO"]}>
            <DireccionPage />
          </ProtectedRoute>
        }
      /> */}

      {/* Admin Dashboard — solo ADMIN */}
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      /> */}

      {/* Admin Usuarios — solo ADMIN */}
      {/* <Route
        path="/admin/usuarios"
        element={
          <ProtectedRoute requiredRoles={["ADMIN"]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      /> */}

      {/* Todotask — módulo disponible por nombre y permiso */}
      {/* <Route
        path="/todotask"
        element={
          <ProtectedRoute requiredRoles={["ADMIN", "DIRECTOR", "ADMINISTRATIVO"]}>
            <TodoTaskPage />
          </ProtectedRoute>
        }
      /> */}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
