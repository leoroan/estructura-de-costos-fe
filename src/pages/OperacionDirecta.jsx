import { useState } from "react";

const TAB_OPTIONS = [
  { id: "fuel", label: "Combustible" },
  { id: "insurance", label: "Seguros" },
  { id: "tolls", label: "Peajes" },
  { id: "tax", label: "Impuestos" },
];

const DEFAULT_DATA = {
  fuel: { monthlyConsumption: 0, unitPrice: 0 },
  insurance: { premium: 0, taxes: 0, netPremium: 0 },
  tolls: { monthlyExpense: 0, line: "UPA" },
  tax: { cheque: 0, otherTax: 0 },
};

export default function OperacionDirecta() {
  const [activeTab, setActiveTab] = useState("fuel");
  const [data, setData] = useState(DEFAULT_DATA);

  const handleChange = (tab, field, value) => {
    setData((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: Number(value),
      },
    }));
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Operación directa</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Combustible, seguros, peajes e impuestos</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Consolidá los gastos directos mensuales de la operación con pestañas internas para cada rubro y carga ágil.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {TAB_OPTIONS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {activeTab === "fuel" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Consumo mensual (L)</span>
              <input
                type="number"
                value={data.fuel.monthlyConsumption}
                onChange={(event) => handleChange("fuel", "monthlyConsumption", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Precio unitario</span>
              <input
                type="number"
                value={data.fuel.unitPrice}
                onChange={(event) => handleChange("fuel", "unitPrice", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              />
            </label>
          </div>
        )}

        {activeTab === "insurance" && (
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Prima</span>
              <input
                type="number"
                value={data.insurance.premium}
                onChange={(event) => handleChange("insurance", "premium", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Impuestos</span>
              <input
                type="number"
                value={data.insurance.taxes}
                onChange={(event) => handleChange("insurance", "taxes", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Premio neto sin IVA</span>
              <input
                type="number"
                value={data.insurance.netPremium}
                onChange={(event) => handleChange("insurance", "netPremium", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              />
            </label>
          </div>
        )}

        {activeTab === "tolls" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Gasto mensual</span>
              <input
                type="number"
                value={data.tolls.monthlyExpense}
                onChange={(event) => handleChange("tolls", "monthlyExpense", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Línea de transporte</span>
              <input
                type="text"
                value={data.tolls.line}
                onChange={(event) => setData((prev) => ({ ...prev, tolls: { ...prev.tolls, line: event.target.value } }))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              />
            </label>
          </div>
        )}

        {activeTab === "tax" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Impuesto al Cheque</span>
              <input
                type="number"
                value={data.tax.cheque}
                onChange={(event) => handleChange("tax", "cheque", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Otros impuestos</span>
              <input
                type="number"
                value={data.tax.otherTax}
                onChange={(event) => handleChange("tax", "otherTax", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
              />
            </label>
          </div>
        )}
      </section>
    </div>
  );
}
