import { useMemo, useState } from "react";
import { INSUMOS_MASTER } from "../constants/globalConfig.js";

const initialRows = INSUMOS_MASTER.map((item) => ({
  ...item,
  price: 0,
  provider: "",
  yield: 0,
}));

export default function CatalogoInsumos() {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => rows.filter((row) => row.name.toLowerCase().includes(search.toLowerCase()) || row.provider.toLowerCase().includes(search.toLowerCase())),
    [rows, search]
  );

  const updateRow = (id, field, value) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: field === "provider" ? value : Number(value) } : row)));
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Catálogo maestro</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Insumos, precios y rendimientos</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Gestioná los valores de mercado y los coeficientes técnicos de consumo con una tabla editable y búsqueda rápida.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Buscar</p>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
              placeholder="Filtrar por insumo o proveedor"
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-white text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Insumo</th>
                <th className="px-4 py-3 font-semibold">Unidad</th>
                <th className="px-4 py-3 font-semibold">Proveedor</th>
                <th className="px-4 py-3 font-semibold">Precio referencia</th>
                <th className="px-4 py-3 font-semibold">Rendimiento técnico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 text-slate-700">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600">{row.unit}</td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.provider}
                      onChange={(event) => updateRow(row.id, "provider", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={row.price}
                      onChange={(event) => updateRow(row.id, "price", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={row.yield}
                      onChange={(event) => updateRow(row.id, "yield", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
