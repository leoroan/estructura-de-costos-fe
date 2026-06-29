export const dashboardHighlights = [
  { label: "Costos variables", value: "$ 1.84 / km", caption: "Combustible, neumáticos y lubricantes" },
  { label: "Personal", value: "48%", caption: "Principal componente del costo operacional" },
  { label: "Subsidio estimado", value: "$ 1.2M", caption: "Cálculo base para la brecha del servicio" },
  { label: "Punto de equilibrio", value: "$ 2.41", caption: "Tarifa mínima sugerida sin subsidio" },
];

export const inputModules = [
  {
    title: "Parámetros macro y operativos",
    description: "Selector global de período y métricas por grupo tarifario como UPA y UMA.",
    accent: "indigo",
    path: "/parametros-globales",
  },
  {
    title: "Catálogo de insumos",
    description: "Precios de referencia, proveedores y coeficientes técnicos de rendimiento.",
    accent: "emerald",
    path: "/catalogo-insumos",
  },
  {
    title: "Gestión de flota",
    description: "Alta y análisis de vehículos, amortización y costo de capital.",
    accent: "amber",
    path: "/flota",
  },
  {
    title: "Gestión de personal",
    description: "Escalas salariales, cargas sociales y cálculo de costo laboral total.",
    accent: "indigo",
    path: "/personal",
  },
  {
    title: "Operación directa",
    description: "Carga de combustible, seguros, peajes e impuestos en un tablero operativa.",
    accent: "emerald",
    path: "/operacion-directa",
  },
  {
    title: "Caja e IVA",
    description: "Balance entre costos erogables, no erogables y saldo técnico de IVA.",
    accent: "amber",
    path: "/liquidacion-financiera",
  },
  {
    title: "Simulación de subsidios",
    description: "What-if de combustible, paritarias y volumen de pasajeros con resultados inmediatos.",
    accent: "indigo",
    path: "/simulador-subsidios",
  },
];

export const scenarioCards = [
  {
    title: "Subida del gasoil",
    description: "Simulá un aumento del 20% y observá el impacto en el costo por kilómetro y la brecha de subsidio.",
  },
  {
    title: "Paritaria del personal",
    description: "Evaluá cómo una nueva escala salarial altera el costo fijo y el punto de equilibrio del servicio.",
  },
  {
    title: "Cambio de tarifa de usuario",
    description: "Analizá el efecto de ajustar la tarifa de usuario sobre la recaudación y la cobertura del servicio.",
  },
  {
    title: "Ampliación del servicio",
    description: "Proyectá el impacto de sumar recorridos o kilómetros sobre los costos y la capacidad de subsidio.",
  },
];
