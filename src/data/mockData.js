export const INTERVIEW_SLOTS = [
  "2026-04-22 10:00",
  "2026-04-22 15:00",
  "2026-04-23 09:00",
  "2026-04-23 16:00",
  "2026-04-24 11:00",
];

export const INITIAL_TEACHERS = [
  {
    id: "teacher-01",
    name: "Paula Mendez",
    email: "paula@example.com",
    phone: "+56 9 1111 1111",
    institution: "Consultora Norte",
    bio: "Consultora con foco en liderazgo operacional y supervision de equipos de tienda.",
    thematicAreas: ["liderazgo", "equipos"],
    industries: ["retail", "servicios"],
    appliedExamples: [
      "Coordino jefaturas de tienda y supervisores en procesos de apertura.",
      "Uso casos de quiebres de stock y cambios de turno para enseniar liderazgo operativo.",
    ],
    experience: "12 anios liderando equipos operativos y formando mandos medios.",
    registrationSource: "referido",
    status: "validacion 1 pendiente",
    createdAt: "2026-04-10",
    audience: "supervisores",
    preQuestionnaire: {
      realProblem:
        "En retail vi que los supervisores reaccionaban tarde a cambios de demanda y el equipo operaba por intuicion. Eso generaba quiebres de stock y conflictos entre turnos.",
      appliedCase:
        "En una cadena regional de tiendas documente una semana de errores de reposicion, rediseñe la reunion de inicio de turno y entrene a jefaturas para priorizar por impacto comercial. En seis semanas bajaron los reclamos y mejoro la coordinacion entre sala y bodega.",
      commonMistake:
        "Muchos mandos medios creen que liderar es repetir instrucciones. En la practica dejan sin contexto al equipo y corrigen demasiado tarde.",
      teachingExample:
        "Uso el ejemplo de una tienda que recibe una promocion fuerte un viernes sin ajustar turnos ni reposicion. Eso permite mostrar como una buena supervision evita perdida de venta y desgaste del equipo.",
    },
  },
];

export const INITIAL_CONTENT_NEEDS = [
  {
    id: "need-01",
    title: "Liderazgo operacional para jefaturas de tienda",
    program: "Diplomado Liderazgo Aplicado",
    targetAudience: "supervisores",
    topic: "liderazgo",
    targetIndustry: "retail",
    description:
      "Necesidad orientada a jefaturas intermedias que deben coordinar turnos, priorizar incidencias y sostener resultados en piso.",
    shortNeed:
      "Buscamos experiencia real en liderazgo de tienda, coordinacion operativa y priorizacion diaria.",
    expertProfile:
      "Alguien que haya liderado jefaturas o supervisores en retail y pueda compartir casos aplicados, no teoria general.",
    exampleSignals:
      "Quiebres de stock, apertura y cierre de tienda, coordinacion entre sala y bodega, cambios de turno, presion comercial.",
    status: "abierta",
    internalOwner: "camila@equipo.cl",
    createdAt: "2026-04-09",
  },
  {
    id: "need-02",
    title: "Gestion de personas para supervisores de planta",
    program: "Programa Lideres de Operacion",
    targetAudience: "supervisores",
    topic: "gestion de personas",
    targetIndustry: "manufactura",
    description:
      "Buscamos expertos que hayan gestionado desempeno, coordinacion de turnos y conversaciones dificiles en plantas o entornos operativos.",
    shortNeed:
      "Necesitamos casos reales de supervision de planta, desempeno y gestion de personas en turnos.",
    expertProfile:
      "Alguien que haya trabajado con supervisores de planta y pueda relatar decisiones concretas con impacto en coordinacion y rendimiento.",
    exampleSignals:
      "Rotacion, ausentismo, conversaciones dificiles, seguridad operacional, conflictos entre turnos y seguimiento en planta.",
    status: "abierta",
    internalOwner: "jorge@equipo.cl",
    createdAt: "2026-04-12",
  },
  {
    id: "need-03",
    title: "Marketing aplicado para equipos comerciales en banca",
    program: "Escuela Comercial Adultos",
    targetAudience: "jefaturas intermedias",
    topic: "marketing",
    targetIndustry: "banca",
    description:
      "Necesitamos casos reales de segmentacion, propuesta de valor y ejecucion comercial en contextos regulados y con clientes adultos.",
    shortNeed:
      "Buscamos expertise comercial aplicado en banca, con foco en clientes adultos y ejecucion en terreno.",
    expertProfile:
      "Alguien que haya tomado decisiones de marketing o gestion comercial en banca y pueda explicarlas con ejemplos observables.",
    exampleSignals:
      "Segmentacion, campanias, propuesta de valor, venta consultiva, restricciones regulatorias y coordinacion con equipos comerciales.",
    status: "abierta",
    internalOwner: "ines@equipo.cl",
    createdAt: "2026-04-14",
  },
];

export const INITIAL_INTERVIEWS = [
  {
    id: "interview-01",
    applicationId: "application-01",
    teacherId: "teacher-01",
    contentNeedId: "need-01",
    assistantId: "assistant-01",
    dateTime: "2026-04-21 10:00",
    status: "ficha completada",
    meetingLink: "https://meet.example.com/interview-01",
    recordingUrl: "https://storage.example.com/recording-01.mp4",
    transcriptUrl: "https://storage.example.com/transcript-01.docx",
    notes: "El relato fue fuerte en casos de cambio de turno y priorizacion diaria.",
    summary:
      "La docente entrego un caso aplicado claro sobre supervision en retail y errores comunes de jefaturas intermedias.",
    createdAt: "2026-04-10",
  },
];

export const INITIAL_APPLICATIONS = [
  {
    id: "application-01",
    teacherId: "teacher-01",
    contentNeedId: "need-01",
    selectedArea: "liderazgo",
    status: "entrevista agendada",
    createdAt: "2026-04-10",
  },
];

export const INITIAL_KNOWLEDGE_CARDS = [
  {
    id: "card-01",
    interviewId: "interview-01",
    topic: "Liderazgo operacional para mandos medios en retail",
    thematicArea: "liderazgo",
    targetAudience: "supervisores",
    industry: "retail",
    problemSolved:
      "Ayuda a jefaturas intermedias a ordenar decisiones de piso cuando cambian prioridades comerciales, evitando descoordinacion entre sala, caja y bodega.",
    mainAppliedCase:
      "La docente explico como reorganizo la reunion de inicio de turno, redefinio criterios de escalamiento y logro bajar reclamos operativos luego de seis semanas.",
    centralIdea:
      "El liderazgo operativo no consiste en hablar mas fuerte, sino en dar contexto, criterio y seguimiento para que el equipo actue a tiempo.",
    keyStatements: [
      "La supervision efectiva reduce complejidad operativa.",
      "Las jefaturas deben traducir prioridades comerciales a decisiones observables.",
      "El equipo necesita contexto antes que instrucciones aisladas.",
    ],
    commonErrors:
      "Corregir tarde, no priorizar incidencias y asumir que el equipo entiende por que cambia una instruccion.",
    appliedExample:
      "Una promocion de fin de semana sin ajuste de turnos ni reposicion muestra de inmediato la diferencia entre supervisar y solo reaccionar.",
    importantDistinctions:
      "Supervisar no es microgestionar. Tampoco equivale a delegar sin seguimiento.",
    whatNotToDo:
      "No convertir liderazgo en checklist vacio ni culpar al equipo sin revisar seniales operativas.",
    assistantNotes:
      "Conviene preservar el ejemplo de apertura de tienda y quiebre de stock como pieza central.",
    version: 1,
    validationStatus: "pendiente",
    source: {
      interviewUrl: "https://meet.example.com/interview-01",
      transcriptUrl: "https://storage.example.com/transcript-01.docx",
      version: 1,
    },
  },
];

export const INITIAL_VALIDATION_COMMENTS = [
  {
    id: "validation-01",
    knowledgeCardId: "card-01",
    teacherId: "teacher-01",
    comment:
      "Mantener la diferencia entre supervisar y microgestionar. Ese matiz es critico para que el contenido no simplifique demasiado el rol.",
    createdAt: "2026-04-15",
    associatedVersion: 1,
  },
];

export const INITIAL_SCORM_REVIEW = [
  {
    id: "scorm-review-01",
    moduleId: "module-01",
    teacherId: "teacher-01",
    slideId: "slide-legacy-01",
    action: "eliminar",
    reason:
      "La lamina mezclaba liderazgo con motivacion general y perdia el foco operacional del caso real.",
    createdAt: "2026-04-18",
  },
];
