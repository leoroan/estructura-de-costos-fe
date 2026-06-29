# Services

## Propósito
Encapsular la comunicación con APIs y fuentes externas.

## Cuándo usarlo
- Llamadas HTTP.
- Integraciones con backends o servicios terceros.
- Transformación de datos para el consumo de la UI.

## Reglas
- Mantener los servicios orientados a infraestructura y datos.
- Evitar mezclar lógica de presentación en este nivel.
- Centralizar errores, headers y configuración aquí.
