import { useMemo, useState } from "react";
import { SUBSIDIO_SLIDER_CONFIG, SUBSIDIO_SLIDER_DEFAULTS } from "../constants/financeConstants.js";

const BASE_VALUES = {
  costoTotal: 1080000,
  beneficioRazonablePct: 0.12,
  recaudacionSUBE: 420000,
};

export default function SimuladorSubsidios() {
  const [sliders, setSliders] = useState(SUBSIDIO_SLIDER_DEFAULTS);

  const adjustedFuel = BASE_VALUES.costoTotal * (1 + sliders.fuelIncreasePct / 100);
  const adjustedWage = BASE_VALUES.costoTotal * (1 + sliders.wageIncreasePct / 100);
  const adjustedPassenger = BASE_VALUES.recaudacionSUBE * (1 + sliders.passengerVolumePct / 100);
  const tarifaTecnica = (adjustedFuel + adjustedWage) * (1 + BASE_VALUES.beneficioRazonablePct);
  const subsidioRequerido = Math.max(0, tarifaTecnica - adjustedPassenger);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Subsidios</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Simulación de compensaciones y what-if</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Modificá variables clave y visualizá el impacto inmediato en la tarifa técnica y el subsidio requerido.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Subsidio total</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">${subsidioRequerido.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
        <div className="space-y-5">
          {SUBSIDIO_SLIDER_CONFIG.map((slider) => (
            <div key={slider.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{slider.label}</p>
                <p className="text-sm text-slate-300">{sliders[slider.key]}{slider.suffix}</p>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={sliders[slider.key]}
                onChange={(event) => setSliders((prev) => ({ ...prev, [slider.key]: Number(event.target.value) }))}
                className="w-full accent-emerald-400"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Tarifa técnica</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">${tarifaTecnica.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Recaudación SUBE</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">${adjustedPassenger.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Diferencia</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">${subsidioRequerido.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
