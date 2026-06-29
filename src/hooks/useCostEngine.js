import { useMemo } from "react";
import { COST_ENGINE_DEFAULTS, COST_MODULE_LABELS } from "../constants/costConstants.js";

export function useCostEngine(overrides = {}) {
  const config = { ...COST_ENGINE_DEFAULTS, ...overrides };

  return useMemo(() => {
    const variableCost = {
      combustible: config.consumoPorKm.combustible * config.precios.combustible * config.kmsOperados,
      neumáticos: config.consumoPorKm.neumáticos * config.precios.neumático * config.kmsOperados,
      lubricantes: config.consumoPorKm.lubricantes * config.precios.lubricante * config.kmsOperados,
    };

    const totalVariable = Object.values(variableCost).reduce((sum, value) => sum + value, 0);
    const totalFijo = Object.values(config.costosFijos).reduce((sum, value) => sum + value, 0);
    const costoTotal = totalVariable + totalFijo;
    const recaudacion = config.tarifaUsuario * config.kmsOperados;
    const beneficioDeseado = costoTotal * config.beneficioMarginal;
    const subtotal = costoTotal + beneficioDeseado;
    const subsidioNecesario = Math.max(0, subtotal - recaudacion);
    const costoPorKm = costoTotal / config.kmsOperados;
    const puntoEquilibrio = subtotal / config.kmsOperados;

    return {
      config,
      variableCost,
      totalVariable,
      totalFijo,
      costoTotal,
      recaudacion,
      beneficioDeseado,
      subsidioNecesario,
      costoPorKm,
      puntoEquilibrio,
      breakdown: {
        ...variableCost,
        personal: config.costosFijos.personal,
        seguros: config.costosFijos.seguros,
        depreciación: config.costosFijos.depreciación,
        capital: config.costosFijos.capital,
      },
      labels: COST_MODULE_LABELS,
    };
  }, [config]);
}
