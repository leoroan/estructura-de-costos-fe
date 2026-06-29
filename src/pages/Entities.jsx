import { Link } from "react-router-dom";
import SectionCard from "../components/SectionCard.jsx";
import { useDomainEntities } from "../hooks/useDomainEntities.js";
import { ENTITY_RELATIONSHIPS, FUNCTIONAL_MODULES } from "../constants/domainData.js";

export default function Entities() {
  const { data, error, hasData, loading } = useDomainEntities();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Entidades principales</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Modelo de datos de transporte</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Este módulo presenta las entidades centrales del sistema y sus relaciones para apoyar la implementación de un backend y API services.
            </p>
          </div>
          <Link
            to="/configuracion"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Ir a Configuración
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.entities.map((entity) => (
          <div key={entity.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{entity.label}</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">{entity.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Relaciones</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Cardinalidades y dependencias clave</h2>
          </div>
          {loading ? (
            <p className="text-sm text-slate-500">Cargando relaciones...</p>
          ) : error ? (
            <p className="text-sm text-rose-600">{error}</p>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Entidad 1</th>
                <th className="px-4 py-3 font-semibold">Relación</th>
                <th className="px-4 py-3 font-semibold">Entidad 2</th>
                <th className="px-4 py-3 font-semibold">Cardinalidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {ENTITY_RELATIONSHIPS.map((item) => (
                <tr key={`${item.source}-${item.target}`}> 
                  <td className="px-4 py-3 text-slate-700">{item.source}</td>
                  <td className="px-4 py-3 text-slate-600">{item.relation}</td>
                  <td className="px-4 py-3 text-slate-700">{item.target}</td>
                  <td className="px-4 py-3 text-slate-600">{item.cardinality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {FUNCTIONAL_MODULES.map((module) => (
          <SectionCard
            key={module.title}
            title={module.title}
            description={module.description}
            accent="emerald"
          />
        ))}
      </section>
    </div>
  );
}
