import { useCostEngine } from "../hooks/useCostEngine.js";

export default function Costos() {
  const {
    config,
    variableCost,
    totalVariable,
    totalFijo,
    costoTotal,
    recaudacion,
    beneficioDeseado,
    subsidioNecesario,
    costoPorKm,
    puntoEquilibrio,
    breakdown,
    labels,
  } = useCostEngine();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Costos operativos</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Motor de cálculo de costos</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Este módulo calcula costos variables, costos fijos, costo por km y determina la brecha de subsidio con los valores base.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Variables</p>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>Kms operados: {config.kmsOperados.toLocaleString()}</p>
            <p>Tarifa usuario: ${config.tarifaUsuario.toFixed(2)}</p>
            <p>Tarifa técnica: ${config.tarifaTecnica.toFixed(2)}</p>
            <p>Beneficio objetivo: {Math.round(config.beneficioMarginal * 100)}%</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Resumen de resultados</p>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>Costo total: ${costoTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            <p>Recaudación estimada: ${recaudacion.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            <p>Beneficio deseado: ${beneficioDeseado.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            <p>Subsidio necesario: ${subsidioNecesario.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            <p>Costo por km: ${costoPorKm.toFixed(2)}</p>
            <p>Punto de equilibrio: ${puntoEquilibrio.toFixed(2)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">{labels[key] || key}</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
