import SectionCard from "../components/SectionCard.jsx";
import { FUNCTIONAL_MODULES } from "../constants/domainData.js";

const CONFIG_OPTIONS = [
  {
    title: "Precios de insumos",
    description: "Carga valores sin IVA de combustible, lubricantes y neumáticos para el cálculo de costos variables.",
    accent: "indigo",
  },
  {
    title: "Escalas salariales",
    description: "Define sueldos básicos, premios, viáticos y cargas sociales para el cálculo del costo de personal.",
    accent: "emerald",
  },
  {
    title: "Parámetros fiscales",
    description: "Registra tasas de aportes patronales, seguros de vida y ART para los costos fijos.",
    accent: "amber",
  },
  {
    title: "Valor de reposición",
    description: "Actualiza el precio de unidades nuevas para amortización y costo de capital.",
    accent: "indigo",
  },
];

export default function Configuracion() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Configuración</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Entradas y precios del sistema</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Aquí se concentra la carga de valores base que alimentan el motor de cálculo: insumos, nómina, cargas sociales y valor de reposición.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {CONFIG_OPTIONS.map((item) => (
          <SectionCard key={item.title} title={item.title} description={item.description} accent={item.accent} />
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Motor de cálculo</p>
        <h2 className="mt-2 text-2xl font-semibold">Escalas y parámetros</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {FUNCTIONAL_MODULES.slice(0, 2).map((module) => (
            <div key={module.title} className="rounded-3xl border border-white/10 bg-white/10 p-5 text-sm text-slate-100">
              <p className="font-semibold text-white">{module.title}</p>
              <p className="mt-2 text-slate-300">{module.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
