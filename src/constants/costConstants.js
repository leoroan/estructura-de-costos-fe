export const COST_ENGINE_DEFAULTS = {
  kmsOperados: 500000,
  beneficioMarginal: 0.12,
  tarifaUsuario: 2.8,
  tarifaTecnica: 3.5,
  consumoPorKm: {
    combustible: 0.25,
    neumáticos: 0.006,
    lubricantes: 0.012,
  },
  precios: {
    combustible: 1.35,
    neumático: 320,
    lubricante: 28,
  },
  costosFijos: {
    personal: 620000,
    seguros: 96000,
    depreciación: 240000,
    capital: 180000,
  },
};

export const COST_MODULE_LABELS = {
  combustible: "Combustible",
  neumáticos: "Neumáticos",
  lubricantes: "Lubricantes",
  personal: "Personal",
  seguros: "Seguros",
  depreciación: "Depreciación",
  capital: "Costo de capital",
};
