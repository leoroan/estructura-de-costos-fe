import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { usePeriod } from "../context/PeriodContext.jsx";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "../constants/globalConfig.js";

export default function Navbar() {
  const { user, logout } = useUser();
  const { period, setPeriod } = usePeriod();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
            CT
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">CostoTransporte</p>
            <p className="text-xs text-slate-500">Gestión de costos y subsidios</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
          <Link to="/" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Inicio
          </Link>
          <Link to="/parametros-globales" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Parám. globales
          </Link>
          <Link to="/catalogo-insumos" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Insumos
          </Link>
          <Link to="/flota" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Flota
          </Link>
          <Link to="/personal" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Personal
          </Link>
          <Link to="/operacion-directa" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Operación
          </Link>
          <Link to="/liquidacion-financiera" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            IVA
          </Link>
          <Link to="/simulador-subsidios" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
            Subsidios
          </Link>
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-3 py-2 text-white transition hover:bg-slate-800"
            >
              Salir
            </button>
          ) : (
            <Link to="/login" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
              Demo
            </Link>
          )}
        </nav>
        {user ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-700 sm:mt-0">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="text-slate-500">Período</span>
              <select
                value={period.month}
                onChange={(event) => setPeriod((prev) => ({ ...prev, month: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-sm outline-none"
              >
                {MONTH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <select
                value={period.year}
                onChange={(event) => setPeriod((prev) => ({ ...prev, year: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-sm outline-none"
              >
                {YEAR_OPTIONS.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
