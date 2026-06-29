import { fetchApi } from "./api.js";

const DOMAIN_ROUTES = {
  VEHICULOS: "/vehiculo",
  PERSONAL: "/personal",
  LINEAS_TRANSPORTE: "/linea-transporte",
  INSUMOS: "/insumo",
  PROVEEDORES: "/proveedor",
  COSTOS_OPERATIVOS: "/costo-operativo",
  RECAUDACION: "/recaudacion",
  POLIZAS_SEGURO: "/poliza-seguro",
  SUBSIDIOS: "/subsidio",
  REPORTES_RESUMEN: "/reportes/resumen",
};

export const domainApi = {
  getVehiculos: (params) => fetchApi(DOMAIN_ROUTES.VEHICULOS, { params }),
  getPersonal: (params) => fetchApi(DOMAIN_ROUTES.PERSONAL, { params }),
  getLineasTransporte: (params) => fetchApi(DOMAIN_ROUTES.LINEAS_TRANSPORTE, { params }),
  getInsumos: (params) => fetchApi(DOMAIN_ROUTES.INSUMOS, { params }),
  getProveedores: (params) => fetchApi(DOMAIN_ROUTES.PROVEEDORES, { params }),
  getCostosOperativos: (params) => fetchApi(DOMAIN_ROUTES.COSTOS_OPERATIVOS, { params }),
  getRecaudacion: (params) => fetchApi(DOMAIN_ROUTES.RECAUDACION, { params }),
  getPolizasSeguro: (params) => fetchApi(DOMAIN_ROUTES.POLIZAS_SEGURO, { params }),
  getSubsidios: (params) => fetchApi(DOMAIN_ROUTES.SUBSIDIOS, { params }),
  getReportesResumen: (params) => fetchApi(DOMAIN_ROUTES.REPORTES_RESUMEN, { params }),
};
