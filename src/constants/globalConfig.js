export const MONTH_OPTIONS = [
  { label: "Enero", value: "01" },
  { label: "Febrero", value: "02" },
  { label: "Marzo", value: "03" },
  { label: "Abril", value: "04" },
  { label: "Mayo", value: "05" },
  { label: "Junio", value: "06" },
  { label: "Julio", value: "07" },
  { label: "Agosto", value: "08" },
  { label: "Septiembre", value: "09" },
  { label: "Octubre", value: "10" },
  { label: "Noviembre", value: "11" },
  { label: "Diciembre", value: "12" },
];

export const YEAR_OPTIONS = [2025, 2026, 2027, 2028];

export const TARIFF_GROUPS = [
  { key: "upa", label: "UPA" },
  { key: "upaKm", label: "UPA KM" },
  { key: "uma1", label: "UMA 1" },
  { key: "uma2", label: "UMA 2" },
];

export const INSUMOS_MASTER = [
  { id: 1, name: "Gasoil", unit: "L" },
  { id: 2, name: "Neumáticos", unit: "unidad" },
  { id: 3, name: "Lubricantes", unit: "L" },
  { id: 4, name: "Repuestos", unit: "unidad" },
];

export const FLEET_SAMPLE = [
  { id: 1, model: "OH 1618", chassis: "Monoblock", body: "Estandar", year: 2018, ac: true, fuel: "Gasoil", value: 980000 },
  { id: 2, model: "O 500 M", chassis: "Chapa", body: "Lowentry", year: 2021, ac: false, fuel: "GNC", value: 1235000 },
  { id: 3, model: "OH 1718", chassis: "Monoblock", body: "Estandar", year: 2016, ac: true, fuel: "Gasoil", value: 860000 },
];

export const PERSONNEL_CATEGORIES = [
  { id: 1, category: "Conducción", base: 155000 },
  { id: 2, category: "Tráfico", base: 132000 },
  { id: 3, category: "Administración", base: 125000 },
  { id: 4, category: "Técnico", base: 141000 },
];
