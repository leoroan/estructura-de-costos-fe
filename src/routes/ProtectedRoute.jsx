import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm">
          Cargando sesión...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
