import { useEffect, useMemo, useState } from "react";
import { domainApi } from "../services/domainApi.js";
import { ENTITIES, ENTITY_RELATIONSHIPS } from "../constants/domainData.js";

const FALLBACK_DATA = { entities: ENTITIES, relationships: ENTITY_RELATIONSHIPS };

export function useDomainEntities() {
  const [data, setData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadDomain() {
      try {
        const [vehiculos, personal, lineas, insumos, proveedores, costos, recaudacion, polizas, subsidios] = await Promise.all([
          domainApi.getVehiculos(),
          domainApi.getPersonal(),
          domainApi.getLineasTransporte(),
          domainApi.getInsumos(),
          domainApi.getProveedores(),
          domainApi.getCostosOperativos(),
          domainApi.getRecaudacion(),
          domainApi.getPolizasSeguro(),
          domainApi.getSubsidios(),
        ]);

        if (!active) return;

        setData({
          ...FALLBACK_DATA,
          vehiculos,
          personal,
          lineas,
          insumos,
          proveedores,
          costos,
          recaudacion,
          polizas,
          subsidios,
        });
      } catch (err) {
        if (!active) return;
        setError(err.message || "No se pudieron cargar los datos del dominio.");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    }

    loadDomain();
    return () => {
      active = false;
    };
  }, []);

  const hasData = useMemo(() => data.entities.length > 0, [data.entities]);

  return {
    data,
    loading,
    error,
    hasData,
  };
}
