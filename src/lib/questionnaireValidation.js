export const BLOCKED_GENERIC_PHRASES = [
  "depende",
  "es importante",
  "en general",
  "todo varia",
  "hay muchos casos",
];

export const QUESTIONNAIRE_RULES = {
  realProblem: {
    minLength: 300,
    minWords: 45,
    blockedLabels: ["definicion", "teoria"],
  },
  appliedCase: {
    minLength: 400,
    minWords: 60,
    requiredSignals: ["contexto", "accion", "resultado"],
  },
  commonMistake: {
    minLength: 200,
    minWords: 30,
  },
  teachingExample: {
    minLength: 200,
    minWords: 30,
  },
};

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function countWords(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function containsBlockedPhrase(value) {
  const normalized = normalizeText(value);
  return BLOCKED_GENERIC_PHRASES.some((phrase) => normalized.includes(phrase));
}

function looksTooGeneric(value) {
  const normalized = normalizeText(value);
  const genericPatterns = [
    "se trata de",
    "consiste en",
    "es cuando",
    "como concepto",
    "a nivel general",
  ];

  return genericPatterns.some((pattern) => normalized.includes(pattern));
}

function includesSignals(value, signals) {
  const normalized = normalizeText(value);
  const signalGroups = {
    contexto: ["contexto", "situacion", "escenario", "empresa", "equipo"],
    accion: ["hice", "hicimos", "implemente", "decidi", "intervine", "cambie"],
    resultado: ["resultado", "logramos", "mejoro", "bajo", "aumento", "ocurrio"],
  };

  return signals.every((signal) =>
    (signalGroups[signal] || [signal]).some((item) => normalized.includes(item))
  );
}

function validateNarrative(value, config, fieldLabel) {
  const text = value.trim();

  if (!text) {
    return "Este campo es obligatorio.";
  }

  if (text.length < config.minLength || countWords(text) < config.minWords) {
    return `Necesitamos ejemplos concretos y aplicados para evaluar su experiencia. Minimo ${config.minLength} caracteres.`;
  }

  if (containsBlockedPhrase(text) || looksTooGeneric(text)) {
    return "Necesitamos ejemplos concretos y aplicados para evaluar su experiencia.";
  }

  if (config.requiredSignals && !includesSignals(text, config.requiredSignals)) {
    return `La respuesta de ${fieldLabel} debe incluir contexto, accion y resultado de forma reconocible.`;
  }

  return "";
}

export function validateQuestionnaire(form) {
  const errors = {};

  if (form.areas.length === 0 || form.areas.length > 2) {
    errors.areas = "Seleccione una o dos areas de expertise.";
  }

  if (form.industries.length === 0) {
    errors.industries = "Seleccione al menos una industria.";
  }

  if (form.industries.includes("otra") && !form.otherIndustry.trim()) {
    errors.industries = "Especifique la industria adicional.";
  }

  const realProblemError = validateNarrative(
    form.realProblem,
    QUESTIONNAIRE_RULES.realProblem,
    "problema real"
  );
  if (realProblemError) {
    errors.realProblem = realProblemError;
  }

  const appliedCaseError = validateNarrative(
    form.appliedCase,
    QUESTIONNAIRE_RULES.appliedCase,
    "caso aplicado"
  );
  if (appliedCaseError) {
    errors.appliedCase = appliedCaseError;
  }

  const commonMistakeError = validateNarrative(
    form.commonMistake,
    QUESTIONNAIRE_RULES.commonMistake,
    "error frecuente"
  );
  if (commonMistakeError) {
    errors.commonMistake = commonMistakeError;
  }

  const teachingExampleError = validateNarrative(
    form.teachingExample,
    QUESTIONNAIRE_RULES.teachingExample,
    "ejemplo de ensenanza"
  );
  if (teachingExampleError) {
    errors.teachingExample = teachingExampleError;
  }

  if (!form.audience) {
    errors.audience = "Seleccione el tipo de publico con el que ha trabajado.";
  }

  if (form.selectedSlots.length !== 2) {
    errors.selectedSlots = "Debe seleccionar exactamente dos entrevistas de 1 hora.";
  }

  return errors;
}
