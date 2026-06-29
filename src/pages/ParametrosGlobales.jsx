import { useState } from "react";
import { usePeriod } from "../context/PeriodContext.jsx";
import { MONTH_OPTIONS, YEAR_OPTIONS, TARIFF_GROUPS } from "../constants/globalConfig.js";

const INITIAL_GROUPS = TARIFF_GROUPS.map((group) => ({
  ...group,
  units: 0,
  kms: 0,
  passengers: 0,
}));

export default function ParametrosGlobales() {
  const { period, setPeriod } = usePeriod();
  const [macros, setMacros] = useState({ exchangeRate: 1.0, interestRate: 55.0, taxUpdate: 45.0 });
  const [groups, setGroups] = useState(INITIAL_GROUPS);

  const handleMacroChange = (event) => {
    const { name, value } = event.target;
    setMacros((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleGroupChange = (index, field, value) => {
    setGroups((prev) => prev.map((item, groupIndex) => (groupIndex === index ? { ...item, [field]: Number(value) } : item)));
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Parámetros Globales</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Variables macro y métricas de operación</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Ajustá el perímetro de análisis con un selector global de período y cargá las métricas clave de cada grupo tarifario.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Mes</p>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                value={period.month}
                onChange={(event) => setPeriod((prev) => ({ ...prev, month: event.target.value }))}
              >
                {MONTH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Año</p>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                value={period.year}
                onChange={(event) => setPeriod((prev) => ({ ...prev, year: event.target.value }))}
              >
                {YEAR_OPTIONS.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Variables Macroeconómicas</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <label className="space-y-2 text-sm text-slate-700">
                <span>Tipo de cambio oficial</span>
                <input
                  name="exchangeRate"
                  type="number"
                  value={macros.exchangeRate}
                  onChange={handleMacroChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Tasa de interés %</span>
                <input
                  name="interestRate"
                  type="number"
                  value={macros.interestRate}
                  onChange={handleMacroChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                <span>Actualización impositiva %</span>
                <input
                  name="taxUpdate"
                  type="number"
                  value={macros.taxUpdate}
                  onChange={handleMacroChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                />
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Métricas por grupo tarifario</p>
            <div className="mt-6 space-y-4">
              {groups.map((group, index) => (
                <div key={group.key} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{group.label}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <label className="space-y-2 text-sm text-slate-700">
                      <span>Unidades activas</span>
                      <input
                        type="number"
                        value={group.units}
                        onChange={(event) => handleGroupChange(index, "units", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span>Kms mensuales</span>
                      <input
                        type="number"
                        value={group.kms}
                        onChange={(event) => handleGroupChange(index, "kms", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-slate-700">
                      <span>Pasajeros mensuales</span>
                      <input
                        type="number"
                        value={group.passengers}
                        onChange={(event) => handleGroupChange(index, "passengers", event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
