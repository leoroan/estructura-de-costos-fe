import { REPORT_SUMMARY } from "../constants/domainData.js";
import { dashboardHighlights } from "../constants/appData.js";

export default function Reportes() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Reportes</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Salidas, análisis y escenarios</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Visualiza el impacto de precios, subsidios y tarifas, y descubre cómo cambia el punto de equilibrio en diferentes escenarios.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardHighlights.map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className="mt-2 text-sm text-slate-600">{item.caption}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {REPORT_SUMMARY.map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">{item.label}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Simulador</p>
        <h2 className="mt-2 text-2xl font-semibold">What-if de costos y subsidios</h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
          <p>• Impacto de un aumento del 20% en el gasoil sobre el costo por kilómetro.</p>
          <p>• Efecto de una paritaria nueva en la masa salarial y el punto de equilibrio.</p>
          <p>• Variación de la brecha de subsidio ante cambios de tarifa de usuario.</p>
        </div>
      </section>
    </div>
  );
}
