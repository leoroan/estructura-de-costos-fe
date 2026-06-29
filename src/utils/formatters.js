/**
 * formatters.js — helpers de formato y cálculo transversales.
 */

/** Formatea una fecha ISO a dd/mm/aaaa */
export function formatDate(isoString) {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** Formatea fecha y hora */
export function formatDateTime(isoString) {
  if (!isoString) return "—";
  const d = new Date(isoString);
  return d.toLocaleString("es-AR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

/** Capitaliza la primera letra */
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/** Trunca texto con elipsis */
export function truncate(str, max = 50) {
  if (!str) return "";
  return str.length > max ? `${str.slice(0, max)}…` : str;
}

/** Formatea número como moneda ARS */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(amount ?? 0);
}
