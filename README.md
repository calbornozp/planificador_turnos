# Experta Hub MVP

MVP web para captar docentes expertos, forzar un pre-cuestionario aplicado por industria, gestionar entrevistas de extraccion de conocimiento y operar validaciones humanas sin usar agentes ni IA.

## Resumen ejecutivo

- Ruta elegida: `Supabase + n8n + Google Calendar + storage + frontend liviano`.
- El frontend actual corre sin backend real para acelerar implementacion y dejar el contrato listo.
- La arquitectura prioriza velocidad, claridad operacional, trazabilidad y extensibilidad.
- El sistema cubre solo estas areas: liderazgo, equipos, gestion de personas, marketing, procesos de negocios y administracion.
- El docente no diseña cursos, no crea SCORM y no define evaluaciones.
- El pre-cuestionario aplica validaciones duras sin IA: minimos, frases bloqueadas y chequeos estructurales simples.
- La ficha del ayudante espeja el pre-cuestionario y guarda campos separados con versionado.
- Validacion 1: texto estructurado solo comentable.
- Validacion 2: revision SCORM con eliminacion de laminas y motivo obligatorio.
- La persistencia demo esta en `src/data/mockData.js`; luego puede migrarse a Supabase.

## Arquitectura propuesta

### Decision principal

Se implementa la Ruta B porque Notion sirve bien como backoffice liviano, pero se vuelve mas fragil en cuanto a permisos, versionado, estados operativos, adjuntos, trazabilidad y futura automatizacion a medida que el flujo crece. Para un MVP que debe operar comodo con 500 docentes y dejar una base seria para fase 2, Supabase entrega una estructura mas limpia.

### Componentes

- `React SPA`: landing, flujo docente, panel interno y validaciones.
- `Supabase (fase siguiente)`: tablas, auth basica del equipo interno, storage de grabaciones/transcripciones, policies.
- `n8n (fase siguiente)`: confirmaciones por correo, cambios de estado, handoffs operativos, envios a validacion.
- `Google Calendar (fase siguiente)`: creacion real de entrevistas, links de reunion y confirmaciones.
- `Storage (fase siguiente)`: grabaciones, transcripciones y artefactos de validacion.

### Principios de implementacion

- Nada de IA ni bots en esta fase.
- Adaptadores desacoplados para servicios futuros.
- Datos separados por entidad, no en blobs.
- Estados trazables en todo el ciclo.
- Validaciones simples y configurables.

## Modelo de datos

### 1. Docentes

- `id`
- `name`
- `email`
- `phone`
- `institution`
- `bio`
- `thematicAreas`
- `industries`
- `appliedExamples`
- `experience`
- `registrationSource`
- `status`
- `createdAt`
- `preQuestionnaire`

### 2. Necesidades de contenido

- `id`
- `title`
- `program`
- `targetAudience`
- `topic`
- `targetIndustry`
- `description`
- `status`
- `internalOwner`
- `createdAt`

### 3. Entrevistas

- `id`
- `applicationId`
- `teacherId`
- `contentNeedId`
- `assistantId`
- `dateTime`
- `status`
- `meetingLink`
- `recordingUrl`
- `transcriptUrl`
- `notes`
- `summary`
- `createdAt`

### 4. Fichas de conocimiento

- `id`
- `interviewId`
- `topic`
- `thematicArea`
- `targetAudience`
- `industry`
- `problemSolved`
- `mainAppliedCase`
- `centralIdea`
- `keyStatements`
- `commonErrors`
- `appliedExample`
- `importantDistinctions`
- `whatNotToDo`
- `assistantNotes`
- `version`
- `validationStatus`
- `source`

### 5. Postulaciones

- `id`
- `teacherId`
- `contentNeedId`
- `selectedArea`
- `status`
- `createdAt`

### 6. Comentarios de validacion 1

- `id`
- `knowledgeCardId`
- `teacherId`
- `comment`
- `createdAt`
- `associatedVersion`

### 7. Revisiones SCORM

- `id`
- `moduleId`
- `teacherId`
- `slideId`
- `action`
- `reason`
- `createdAt`

## Backlog inicial

### Epica 1: Captacion publica

- Landing con propuesta de valor y limites del rol docente.
- Vista publica de oportunidades derivadas de necesidades de contenido.
- Creacion de postulacion antes del registro completo del docente.
- Estados de ingreso y origen de registro.

### Epica 2: Pre-cuestionario

- Seleccion de areas e industrias.
- Validaciones de minimos por campo.
- Bloqueo por frases genericas configurables.
- Validacion de caso aplicado con contexto, accion y resultado.

### Epica 3: Agenda

- Seleccion de dos slots de una hora.
- Adaptador futuro para Google Calendar.
- Confirmacion de entrevistas y links de reunion.

### Epica 4: Operacion interna

- Vista de docentes, necesidades, entrevistas y estados.
- Formulario de ficha del ayudante.
- Versionado y trazabilidad a entrevista/transcripcion.

### Epica 5: Validaciones

- Validacion 1 por comentarios.
- Validacion 2 con eliminacion de laminas y motivo.
- Historial de observaciones por version.

### Epica 6: Integraciones futuras

- Supabase Auth para equipo interno.
- Storage para grabaciones y transcripciones.
- n8n para correos y handoffs.
- Calendario real y webhooks de estados.

## Estructura del repositorio

```text
src/
  App.js
  App.css
  data/
    mockData.js
  lib/
    questionnaireValidation.js
  index.js
  index.css
docs/
  api-contract.md
```

## Pantallas implementadas

- `Landing`: explicacion del producto, alcance y arquitectura.
- `Flujo docente`: registro, pre-cuestionario endurecido y agenda.
- `Flujo docente`: oportunidades publicas conectadas a necesidades + postulacion.
- `Panel interno`: resumen operativo, necesidades, entrevistas y ficha del ayudante.
- `Validaciones`: comentario sobre texto estructurado y revision SCORM.

## Como correr localmente

### Requisitos

- Node.js 18.x
- npm 9+

### Pasos

```bash
npm install
npm start
```

La app abre en `http://localhost:3000`.

### Verificacion basica

```bash
npm test -- --watch=false
npm run build
```

## Supuestos documentados

- El MVP usa datos locales en memoria para demostrar el flujo completo.
- La autenticacion interna aun no esta conectada a un proveedor real.
- El agendamiento es una simulacion de slots, no sincroniza calendarios todavia.
- Las grabaciones, transcripciones y SCORM son referencias estructurales, no archivos reales del flujo.

## Preparado para seguir iterando

La base ya deja separados:

- reglas de validacion del pre-cuestionario
- contratos de datos por entidad
- estados operativos del proceso
- puntos de integracion para backend, correo, calendario y storage

El siguiente paso natural es reemplazar `mockData.js` por repositorios reales de Supabase y mover las transiciones de estado a una capa `services/`.

El contrato inicial de endpoints futuros esta en [docs/api-contract.md](./docs/api-contract.md).
