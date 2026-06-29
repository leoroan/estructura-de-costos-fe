import { useMemo, useState } from "react";
import { FLEET_SAMPLE } from "../constants/globalConfig.js";

export default function Flota() {
  const [filter, setFilter] = useState("");
  const filteredFleet = useMemo(
    () => FLEET_SAMPLE.filter(
      (item) =>
        item.model.toLowerCase().includes(filter.toLowerCase()) ||
        item.body.toLowerCase().includes(filter.toLowerCase()) ||
        item.fuel.toLowerCase().includes(filter.toLowerCase())
    ),
    [filter]
  );

  const totalReplacement = FLEET_SAMPLE.reduce((sum, item) => sum + item.value, 0);
  const amortizationMonthly = totalReplacement * 0.08;
  const capitalCost = totalReplacement * 0.12;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Gestión de flota</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Activos, amortización y capital</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Administrá el ciclo de vida financiero de la flota con filtros rápidos y tarjetas de resumen por reemplazo y capital inmovilizado.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Buscar vehículo</p>
            <input
              type="text"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
              placeholder="Modelo, carrocería o combustible"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Valor de reposición</p>
          <p className="mt-5 text-3xl font-semibold text-slate-900">${totalReplacement.toLocaleString()}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Amortización mensual</p>
          <p className="mt-5 text-3xl font-semibold text-slate-900">${amortizationMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Costo de capital</p>
          <p className="mt-5 text-3xl font-semibold text-slate-900">${capitalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Modelo</th>
                <th className="px-4 py-3 font-semibold">Carrocería</th>
                <th className="px-4 py-3 font-semibold">Combustible</th>
                <th className="px-4 py-3 font-semibold">A/C</th>
                <th className="px-4 py-3 font-semibold">Año</th>
                <th className="px-4 py-3 font-semibold">Valuación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredFleet.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="px-4 py-3 text-slate-700">{vehicle.model}</td>
                  <td className="px-4 py-3 text-slate-700">{vehicle.body}</td>
                  <td className="px-4 py-3 text-slate-700">{vehicle.fuel}</td>
                  <td className="px-4 py-3 text-slate-700">{vehicle.ac ? "Sí" : "No"}</td>
                  <td className="px-4 py-3 text-slate-700">{vehicle.year}</td>
                  <td className="px-4 py-3 text-slate-700">${vehicle.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
