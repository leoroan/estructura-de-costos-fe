import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { dashboardHighlights, inputModules, scenarioCards } from "../constants/appData.js";
import SectionCard from "../components/SectionCard.jsx";

export default function Home() {
  const { user, updateUser } = useUser();

  const handleScenario = (label) => {
    updateUser({ lastAction: label });
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 text-white shadow-sm sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-end">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-slate-100">
              Plataforma de gestión de costos y subsidios
            </span>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Simulá costos operativos, tarifas y subsidios para transporte urbano y suburbano.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              El producto está pensado como una propuesta de presentación para validar la implementación de un motor de cálculo orientado a datos maestros, costos por kilómetro y escenarios de negocio.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
                Datos mensuales
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
                Proyección de subsidios
              </span>
              <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-200">
                Escenarios what-if
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Sesión activa</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{user?.name || "Usuario demo"}</h2>
            <p className="mt-2 text-sm text-slate-300">{user?.role || "Analista de operaciones"}</p>
            <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-300">Última interacción</p>
              <p className="mt-1 text-sm font-medium text-white">{user?.lastAction || "Se cargaron datos base para la demo"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardHighlights.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className="mt-2 text-sm text-slate-600">{item.caption}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Entradas</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-900">Módulos principales</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
            {inputModules.map((item) => (
              <Link key={item.title} to={item.path}>
                <SectionCard title={item.title} description={item.description} accent={item.accent} />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Motor de cálculo</p>
          <h2 className="text-2xl font-semibold">Flujo lógico de la propuesta</h2>
          <div className="space-y-3">
            {[
              "Parámetros macro y métricas tarifarias centralizadas",
              "Catálogo maestro de insumos y rendimientos técnicos",
              "Gestión de flota, personal y operación directa",
              "Balance financiero y simulador de subsidios",
            ].map((step) => (
              <div key={step} className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200">
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Simulador</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Escenarios del negocio</h2>
          </div>
          <p className="text-sm text-slate-600">Este mock permite probar la interacción del contexto sin depender de un backend.</p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {scenarioCards.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => handleScenario(item.title)}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-indigo-400 hover:bg-indigo-50"
            >
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
