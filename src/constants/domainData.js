export const ENTITIES = [
  {
    id: "vehiculo",
    label: "Vehículo",
    description: "Material rodante con chasis, carrocería y equipamiento.",
  },
  {
    id: "personal",
    label: "Personal",
    description: "Empleados involucrados en la operación: choferes, mecánicos y administrativos.",
  },
  {
    id: "lineaTransporte",
    label: "Línea de transporte",
    description: "Jurisdicciones o categorías de servicio como UPA y UPA KM.",
  },
  {
    id: "insumo",
    label: "Insumo",
    description: "Consumibles como combustible, lubricantes y neumáticos.",
  },
  {
    id: "proveedor",
    label: "Proveedor",
    description: "Suministradores de insumos y servicios.",
  },
  {
    id: "costoOperativo",
    label: "Costo operativo",
    description: "Registro de los gastos fijos y variables del servicio.",
  },
  {
    id: "recaudacion",
    label: "Recaudación",
    description: "Ingresos generados por el servicio, principalmente pasajes.",
  },
  {
    id: "polizaSeguro",
    label: "Póliza de seguro",
    description: "Seguros asociados a vehículos y responsabilidad civil.",
  },
  {
    id: "subsidio",
    label: "Subsidio",
    description: "Compensaciones estatales para cubrir brechas de costos.",
  },
];

export const ENTITY_RELATIONSHIPS = [
  {
    source: "Vehículo",
    relation: "Pertenece a",
    target: "Línea de transporte",
    cardinality: "N:1",
    description: "Varios vehículos operan en una línea.",
  },
  {
    source: "Personal",
    relation: "Asignado a",
    target: "Línea de transporte",
    cardinality: "N:1",
    description: "Los empleados se asignan a una línea.",
  },
  {
    source: "Proveedor",
    relation: "Provee",
    target: "Insumo",
    cardinality: "1:N",
    description: "Un proveedor suministra uno o varios insumos.",
  },
  {
    source: "Insumo",
    relation: "Genera",
    target: "Costo operativo",
    cardinality: "1:N",
    description: "El uso de insumos genera costos operativos.",
  },
  {
    source: "Línea de transporte",
    relation: "Genera",
    target: "Recaudación",
    cardinality: "1:N",
    description: "Una línea genera múltiples ingresos por pasajes.",
  },
  {
    source: "Línea de transporte",
    relation: "Recibe",
    target: "Subsidio",
    cardinality: "1:N",
    description: "Una línea recibe compensaciones estatales.",
  },
  {
    source: "Vehículo",
    relation: "Asegurado por",
    target: "Póliza de seguro",
    cardinality: "1:1",
    description: "Cada vehículo tiene una póliza asociada.",
  },
  {
    source: "Línea de transporte",
    relation: "Genera",
    target: "Costo operativo",
    cardinality: "1:N",
    description: "Una línea tiene muchos costos operativos asociados.",
  },
];

export const FUNCTIONAL_MODULES = [
  {
    title: "Configuración y precios",
    description: "Carga mensual de precios de insumos, escalas salariales, parámetros fiscales y valor de reposición.",
  },
  {
    title: "Motor de cálculo",
    description: "Automatiza costos variables, costos fijos, depreciación y costo de capital.",
  },
  {
    title: "Ingresos y subsidios",
    description: "Registra recaudación, compara tarifa técnica contra tarifa al usuario y calcula la brecha.",
  },
  {
    title: "Salidas y reportes",
    description: "Genera resúmenes, análisis por km, dashboards y escenarios what-if.",
  },
];

export const REPORT_SUMMARY = [
  {
    label: "Resumen de costos totales",
    value: "Combustible, personal, seguros y capital",
  },
  {
    label: "Análisis por kilómetro",
    value: "Costo por km y eficiencia operacional",
  },
  {
    label: "Impacto por rubro",
    value: "Personal, combustible y subsidio en %.",
  },
  {
    label: "Punto de equilibrio",
    value: "Tarifa necesaria sin subsidio.",
  },
];
