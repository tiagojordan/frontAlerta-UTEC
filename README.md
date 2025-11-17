# AlertaUTEC – Plataforma de Gestión de Incidentes (Frontend)

AlertaUTEC es una aplicación web destinada a centralizar el registro y la gestión de incidentes dentro del campus universitario. Permite reportar problemas de infraestructura, limpieza, seguridad y servicios, ofreciendo una interfaz diferenciada según el rol del usuario. Este repositorio contiene únicamente el frontend, desarrollado en React y TypeScript, que consume una API REST desplegada en AWS.

## Objetivo del sistema

El frontend permite:
- Registrar nuevos incidentes.
- Consultar incidentes existentes.
- Actualizar el estado de un incidente.
- Mostrar vistas específicas según el rol del usuario (estudiante, administrativo o autoridad).

El backend maneja la lógica de persistencia y la estructura de datos, mientras que el frontend se comunica exclusivamente por REST.

## Arquitectura general

### Frontend
- React + TypeScript
- Manejo de roles
- Diseño dark
- Consumo únicamente por REST

### Backend (externo a este repositorio)
- AWS Lambda
- AWS API Gateway
- DynamoDB
- Endpoints REST expuestos

## Endpoints REST utilizados

El cliente de API define:

```ts
const BASE_URL = 'https://rqw237u6qg.execute-api.us-east-1.amazonaws.com';
````

Endpoints utilizados:

### POST /incidentes

Crea un incidente.

Body:

```json
{
  "type": "string",
  "location": "string",
  "description": "string",
  "urgency": "baja | media | alta"
}
```

### GET /incidentes

Obtiene la lista completa de incidentes.
El backend responde:

```json
{
  "ok": true,
  "items": []
}
```

### PATCH /incidentes/{id}

Actualiza el estado de un incidente.

Body:

```json
{
  "status": "pendiente | en_atencion | resuelto"
}
```

## Modelo de datos utilizado en el frontend

```ts
type IncidentStatus = 'pendiente' | 'en_atencion' | 'resuelto';

interface Incident {
  incidentId: string;
  type: string;
  location: string;
  description: string;
  urgency: 'baja' | 'media' | 'alta';
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
}
```

El frontend normaliza las respuestas del backend, ya que algunos campos pueden venir en español (`tipo`, `descripcion`, `ubicacion`, `estado`).

## Roles y comportamiento

### Estudiante

* Puede registrar incidentes.
* No accede a métricas globales.
* No ve el listado completo del campus.
* Vista simplificada enfocada en el reporte.

### Administrativo / Autoridad

* Acceso al dashboard completo.
* Visualización de métricas globales.
* Filtros por estado y urgencia.
* Tabla con todos los incidentes.
* Permite actualizar estados mediante PATCH.

## Diseño de la interfaz

La interfaz utiliza un tema dark, estructura modular y componentes reutilizables. Incluye formularios claros para el registro, tarjetas de métricas (para roles administrativos) y badges que indican urgencia y estado.

## Requisitos de CORS del backend

Para que el frontend funcione correctamente en localhost, el backend debe incluir en todas las respuestas:

```js
{
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
}
```

Los recursos `/incidentes` y `/incidentes/{id}` deben tener habilitado el método OPTIONS en API Gateway.

## Instalación y ejecución

1. Instalar dependencias:

```
npm install
```

2. Ejecutar en desarrollo:

```
npm run dev
```

3. Acceder desde el navegador:

```
http://localhost:5173
```

## Estado del proyecto

* Vistas diferenciadas por rol.
* Integración completa con los endpoints REST.
* Normalización de datos implementada.
* Diseño funcional y consistente.
* El frontend funciona correctamente siempre que el backend tenga CORS configurado.

```
