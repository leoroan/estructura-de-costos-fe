import { useMemo, useState } from "react";
import { PERSONNEL_CATEGORIES } from "../constants/globalConfig.js";

const TAB_OPTIONS = [
  { id: "convenio", label: "Convenio colectivo" },
  { id: "dotacion", label: "Dotación por vehículo" },
];

export default function Personal() {
  const [activeTab, setActiveTab] = useState("convenio");
  const [categories, setCategories] = useState(
    PERSONNEL_CATEGORIES.map((item) => ({ ...item, antiguedad: 0, extras: 0, cargas: 35 }))
  );

  const totalCost = useMemo(
    () => categories.reduce((sum, item) => sum + item.base + item.antiguedad + item.extras + (item.base * item.cargas) / 100, 0),
    [categories]
  );

  const updateCategory = (id, field, value) => {
    setCategories((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: Number(value) } : item)));
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Gestión de personal</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Nómina, convenios y costo laboral</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Configurá las escalas salariales y calculá el costo laboral total integrado por categoría y antigüedad.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Costo total mensual</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">${totalCost.toLocaleString()}</p>
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

      {activeTab === "convenio" ? (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-white text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Categoría</th>
                  <th className="px-4 py-3 font-semibold">Básico</th>
                  <th className="px-4 py-3 font-semibold">Antigüedad</th>
                  <th className="px-4 py-3 font-semibold">Extras</th>
                  <th className="px-4 py-3 font-semibold">Cargas %</th>
                  <th className="px-4 py-3 font-semibold">Costo total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {categories.map((item) => {
                  const cost = item.base + item.antiguedad + item.extras + (item.base * item.cargas) / 100;
                  return (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-slate-700">{item.category}</td>
                      <td className="px-4 py-3 text-slate-700">${item.base.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.antiguedad}
                          onChange={(event) => updateCategory(item.id, "antiguedad", event.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.extras}
                          onChange={(event) => updateCategory(item.id, "extras", event.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.cargas}
                          onChange={(event) => updateCategory(item.id, "cargas", event.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                        />
                      </td>
                      <td className="px-4 py-3 text-slate-700">${cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Matriz de dotación</p>
          <div className="mt-4 text-sm text-slate-600">
            <p className="mb-2">Vista de dotación por vehículo y categorías destinada a controlar horas y asignaciones.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((item) => (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{item.category}</p>
                  <p className="mt-2 text-sm text-slate-700">Básico: ${item.base.toLocaleString()}</p>
                  <p className="text-sm text-slate-700">Antigüedad: {item.antiguedad}</p>
                  <p className="text-sm text-slate-700">Extras: {item.extras}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
