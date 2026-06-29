import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Entities from "../pages/Entities.jsx";
import Configuracion from "../pages/Configuracion.jsx";
import Costos from "../pages/Costos.jsx";
import Reportes from "../pages/Reportes.jsx";
import ParametrosGlobales from "../pages/ParametrosGlobales.jsx";
import CatalogoInsumos from "../pages/CatalogoInsumos.jsx";
import Flota from "../pages/Flota.jsx";
import Personal from "../pages/Personal.jsx";
import OperacionDirecta from "../pages/OperacionDirecta.jsx";
import LiquidacionFinanciera from "../pages/LiquidacionFinanciera.jsx";
import SimuladorSubsidios from "../pages/SimuladorSubsidios.jsx";
import NotFound from "../pages/NotFound.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

export function AppRoute() {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/entidades"
        element={
          <ProtectedRoute>
            <Entities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracion"
        element={
          <ProtectedRoute>
            <Configuracion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parametros-globales"
        element={
          <ProtectedRoute>
            <ParametrosGlobales />
          </ProtectedRoute>
        }
      />
      <Route
        path="/catalogo-insumos"
        element={
          <ProtectedRoute>
            <CatalogoInsumos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/flota"
        element={
          <ProtectedRoute>
            <Flota />
          </ProtectedRoute>
        }
      />
      <Route
        path="/personal"
        element={
          <ProtectedRoute>
            <Personal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/operacion-directa"
        element={
          <ProtectedRoute>
            <OperacionDirecta />
          </ProtectedRoute>
        }
      />
      <Route
        path="/liquidacion-financiera"
        element={
          <ProtectedRoute>
            <LiquidacionFinanciera />
          </ProtectedRoute>
        }
      />
      <Route
        path="/simulador-subsidios"
        element={
          <ProtectedRoute>
            <SimuladorSubsidios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/costos"
        element={
          <ProtectedRoute>
            <Costos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reportes"
        element={
          <ProtectedRoute>
            <Reportes />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
