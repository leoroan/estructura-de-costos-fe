import { useMemo, useState } from "react";
import { SUBSIDIO_SLIDER_CONFIG, SUBSIDIO_SLIDER_DEFAULTS } from "../constants/financeConstants.js";

const COST_PROFILE = {
  erogables: 520000,
  noErogables: 140000,
  ivaCredit: 42000,
  ivaDebit: 32000,
};

export default function LiquidacionFinanciera() {
  const [sliders, setSliders] = useState(SUBSIDIO_SLIDER_DEFAULTS);

  const handleSlider = (key, value) => {
    setSliders((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const totalErogable = COST_PROFILE.erogables + COST_PROFILE.erogables * (sliders.fuelIncreasePct / 100);
  const totalNoErogable = COST_PROFILE.noErogables + COST_PROFILE.noErogables * (sliders.wageIncreasePct / 100);
  const technicalBalance = totalErogable + totalNoErogable;
  const ivaBalance = COST_PROFILE.ivaCredit - COST_PROFILE.ivaDebit;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Estructura de caja</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Costos erogables, no erogables e IVA</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Visualizá la clasificación de gasto desde la perspectiva financiera e impositiva con un balance simple entre costos y crédito fiscal.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Balance de costos</p>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Costos erogables</p>
            <p>${totalErogable.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            <p className="font-semibold text-slate-900">Costos no erogables</p>
            <p>${totalNoErogable.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Saldo técnico de IVA</p>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">IVA crédito</p>
            <p>${COST_PROFILE.ivaCredit.toLocaleString()}</p>
            <p className="font-semibold text-slate-900">IVA débito</p>
            <p>${COST_PROFILE.ivaDebit.toLocaleString()}</p>
            <p className="mt-3 text-slate-900">Saldo técnico a favor: ${ivaBalance.toLocaleString()}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Simulación de impacto</p>
        <div className="mt-6 space-y-5">
          {SUBSIDIO_SLIDER_CONFIG.map((slider) => (
            <div key={slider.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{slider.label}</p>
                <p className="text-sm text-slate-300">{sliders[slider.key]}{slider.suffix}</p>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={sliders[slider.key]}
                onChange={(event) => handleSlider(slider.key, event.target.value)}
                className="w-full accent-emerald-400"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Totales</p>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Costos totales proyectados</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">${(technicalBalance + ivaBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Saldo técnico</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">${technicalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">IVA a favor</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">${ivaBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
