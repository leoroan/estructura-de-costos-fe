import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { mockAuthService } from "../services/mockApi.js";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "admin", password: "demo123" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      const result = await mockAuthService.login(form);
      login(result.user);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "No fue posible iniciar la sesión de demo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-slate-950 p-8 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Presentación</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Acceso de demostración</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Esta vista simula la entrada al sistema para mostrar la experiencia de usuario y la estructura del producto sin depender de un backend real.
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-medium text-slate-200">Credenciales de prueba</p>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <p>Usuario: admin</p>
              <p>Contraseña: demo123</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Ingreso</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ingresar al panel</h2>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="username">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-0 focus:border-indigo-500"
                placeholder="usuario"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-0 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Ingresando..." : "Ingresar al demo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
