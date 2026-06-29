import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Página no encontrada</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          La ruta que buscás no existe o no está disponible en esta demo. Volvé al inicio para seguir explorando la propuesta.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
