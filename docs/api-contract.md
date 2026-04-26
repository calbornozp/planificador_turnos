# Contrato inicial de endpoints

Estos endpoints no estan implementados en esta primera version frontend, pero quedan definidos para la siguiente iteracion con backend real sobre Supabase Edge Functions, un backend liviano o rutas serverless.

## Publicos

### `POST /api/teachers/register`

Registra o actualiza la ficha base del docente.

```json
{
  "name": "Paula Mendez",
  "email": "paula@example.com",
  "phone": "+56 9 1111 1111",
  "institution": "Consultora Norte",
  "bio": "Consultora...",
  "experience": "12 anios...",
  "registrationSource": "landing-publica"
}
```

### `POST /api/teachers/:teacherId/questionnaire`

Guarda el pre-cuestionario endurecido.

```json
{
  "areas": ["liderazgo", "equipos"],
  "industries": ["retail", "servicios"],
  "realProblem": "Texto largo...",
  "appliedCase": "Texto largo...",
  "commonMistake": "Texto largo...",
  "teachingExample": "Texto largo...",
  "audience": "supervisores"
}
```

### `POST /api/applications`

Crea la postulacion que conecta una oportunidad publica con una necesidad interna.

```json
{
  "teacherId": "teacher-01",
  "contentNeedId": "need-01",
  "selectedArea": "liderazgo"
}
```

### `POST /api/interviews/schedule`

Crea las dos entrevistas y sincroniza calendario en la siguiente fase.

```json
{
  "applicationId": "application-01",
  "teacherId": "teacher-01",
  "contentNeedId": "need-01",
  "slots": ["2026-04-22 10:00", "2026-04-23 16:00"]
}
```

## Internos

### `GET /api/dashboard/overview`

Retorna conteos, estados y objetos recientes para operacion.

### `POST /api/knowledge-cards`

Crea una ficha estructurada de conocimiento vinculada a entrevista y version.

### `POST /api/knowledge-cards/:cardId/validation-comments`

Guarda comentarios de validacion 1 asociados a una version.

### `POST /api/scorm-reviews`

Registra una eliminacion de lamina con motivo obligatorio.

```json
{
  "moduleId": "module-01",
  "teacherId": "teacher-01",
  "slideId": "slide-03",
  "action": "eliminar",
  "reason": "La lamina simplifica mal el concepto."
}
```

## Integraciones futuras

- `n8n` escucha eventos de registro, agenda y validacion para correos y tareas internas.
- `Google Calendar` recibe slots confirmados y devuelve links de reunion.
- `Storage` guarda grabaciones, transcripciones y entregables de validacion.
