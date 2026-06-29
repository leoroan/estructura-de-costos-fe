export const SUBSIDIO_SLIDER_DEFAULTS = {
  fuelIncreasePct: 0,
  wageIncreasePct: 0,
  passengerVolumePct: 0,
};

export const SUBSIDIO_SLIDER_CONFIG = [
  {
    key: "fuelIncreasePct",
    label: "Combustible",
    min: 0,
    max: 50,
    step: 1,
    suffix: "%",
  },
  {
    key: "wageIncreasePct",
    label: "Paritarias",
    min: 0,
    max: 30,
    step: 1,
    suffix: "%",
  },
  {
    key: "passengerVolumePct",
    label: "Pasajeros",
    min: -20,
    max: 40,
    step: 1,
    suffix: "%",
  },
];
