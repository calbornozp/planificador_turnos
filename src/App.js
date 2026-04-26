import React, { useMemo, useState } from "react";
import "./App.css";

const DAYS = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

const PDF_PAGE_WIDTH = 595;
const PDF_PAGE_HEIGHT = 842;
const PDF_MARGIN_X = 48;
const PDF_START_Y = 792;
const PDF_LINE_HEIGHT = 16;
const PDF_MAX_CHARS = 88;
const PDF_LINES_PER_PAGE = 44;

const currencyFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

const TAB_CONFIGS = [
  {
    id: "administrativo",
    label: "Turno Administrativo",
    accent: "var(--admin-accent)",
    defaultRows: [
      {
        day: "Lunes",
        start: "09:00",
        end: "18:00",
        breakMinutes: 60,
        taxiPickupPoint: "Av. Apoquindo 4001",
        transferCost: 6800,
      },
      {
        day: "Martes",
        start: "09:00",
        end: "18:00",
        breakMinutes: 60,
        taxiPickupPoint: "Av. Apoquindo 4001",
        transferCost: 6800,
      },
      {
        day: "Miercoles",
        start: "09:00",
        end: "18:00",
        breakMinutes: 60,
        taxiPickupPoint: "Av. Apoquindo 4001",
        transferCost: 6800,
      },
      {
        day: "Jueves",
        start: "09:00",
        end: "18:00",
        breakMinutes: 60,
        taxiPickupPoint: "Av. Apoquindo 4001",
        transferCost: 6800,
      },
      {
        day: "Viernes",
        start: "09:00",
        end: "17:00",
        breakMinutes: 45,
        taxiPickupPoint: "Av. Apoquindo 4001",
        transferCost: 6500,
      },
      {
        day: "Sabado",
        start: "",
        end: "",
        breakMinutes: 0,
        taxiPickupPoint: "",
        transferCost: 0,
      },
      {
        day: "Domingo",
        start: "",
        end: "",
        breakMinutes: 0,
        taxiPickupPoint: "",
        transferCost: 0,
      },
    ],
  },
  {
    id: "dia",
    label: "Turno Dia",
    accent: "var(--day-accent)",
    defaultRows: [
      {
        day: "Lunes",
        start: "08:00",
        end: "17:00",
        breakMinutes: 60,
        taxiPickupPoint: "Plaza de Puente Alto",
        transferCost: 7400,
      },
      {
        day: "Martes",
        start: "08:00",
        end: "17:00",
        breakMinutes: 60,
        taxiPickupPoint: "Plaza de Puente Alto",
        transferCost: 7400,
      },
      {
        day: "Miercoles",
        start: "08:00",
        end: "17:00",
        breakMinutes: 60,
        taxiPickupPoint: "Plaza de Puente Alto",
        transferCost: 7400,
      },
      {
        day: "Jueves",
        start: "08:00",
        end: "17:00",
        breakMinutes: 60,
        taxiPickupPoint: "Plaza de Puente Alto",
        transferCost: 7400,
      },
      {
        day: "Viernes",
        start: "08:00",
        end: "16:00",
        breakMinutes: 45,
        taxiPickupPoint: "Plaza de Puente Alto",
        transferCost: 7100,
      },
      {
        day: "Sabado",
        start: "",
        end: "",
        breakMinutes: 0,
        taxiPickupPoint: "",
        transferCost: 0,
      },
      {
        day: "Domingo",
        start: "",
        end: "",
        breakMinutes: 0,
        taxiPickupPoint: "",
        transferCost: 0,
      },
    ],
  },
  {
    id: "tarde",
    label: "Turno Tarde",
    accent: "var(--late-accent)",
    defaultRows: [
      {
        day: "Lunes",
        start: "14:00",
        end: "22:30",
        breakMinutes: 30,
        taxiPickupPoint: "Metro Pudahuel",
        transferCost: 8600,
      },
      {
        day: "Martes",
        start: "14:00",
        end: "22:30",
        breakMinutes: 30,
        taxiPickupPoint: "Metro Pudahuel",
        transferCost: 8600,
      },
      {
        day: "Miercoles",
        start: "14:00",
        end: "22:30",
        breakMinutes: 30,
        taxiPickupPoint: "Metro Pudahuel",
        transferCost: 8600,
      },
      {
        day: "Jueves",
        start: "14:00",
        end: "22:30",
        breakMinutes: 30,
        taxiPickupPoint: "Metro Pudahuel",
        transferCost: 8600,
      },
      {
        day: "Viernes",
        start: "14:00",
        end: "22:30",
        breakMinutes: 45,
        taxiPickupPoint: "Metro Pudahuel",
        transferCost: 9100,
      },
      {
        day: "Sabado",
        start: "13:00",
        end: "21:00",
        breakMinutes: 30,
        taxiPickupPoint: "Centro Maipu",
        transferCost: 9700,
      },
      {
        day: "Domingo",
        start: "",
        end: "",
        breakMinutes: 0,
        taxiPickupPoint: "",
        transferCost: 0,
      },
    ],
  },
  {
    id: "noche",
    label: "Turno Noche",
    accent: "var(--night-accent)",
    defaultRows: [
      {
        day: "Lunes",
        start: "22:00",
        end: "07:00",
        breakMinutes: 45,
        taxiPickupPoint: "Base Quilicura",
        transferCost: 12900,
      },
      {
        day: "Martes",
        start: "22:00",
        end: "07:00",
        breakMinutes: 45,
        taxiPickupPoint: "Base Quilicura",
        transferCost: 12900,
      },
      {
        day: "Miercoles",
        start: "22:00",
        end: "07:00",
        breakMinutes: 45,
        taxiPickupPoint: "Base Quilicura",
        transferCost: 12900,
      },
      {
        day: "Jueves",
        start: "22:00",
        end: "07:00",
        breakMinutes: 45,
        taxiPickupPoint: "Base Quilicura",
        transferCost: 12900,
      },
      {
        day: "Viernes",
        start: "22:00",
        end: "07:00",
        breakMinutes: 60,
        taxiPickupPoint: "Base Quilicura",
        transferCost: 13400,
      },
      {
        day: "Sabado",
        start: "22:30",
        end: "07:30",
        breakMinutes: 45,
        taxiPickupPoint: "Terminal Norte",
        transferCost: 14200,
      },
      {
        day: "Domingo",
        start: "",
        end: "",
        breakMinutes: 0,
        taxiPickupPoint: "",
        transferCost: 0,
      },
    ],
  },
];

const INITIAL_WORKERS = [
  {
    id: "wrk-1",
    name: "Camila Soto",
    shiftId: "administrativo",
    area: "rrhh",
    usesTaxi: true,
    hasLunch: true,
    vacationStart: "",
    vacationEnd: "",
  },
  {
    id: "wrk-2",
    name: "Mauricio Rojas",
    shiftId: "administrativo",
    area: "finanzas",
    usesTaxi: false,
    hasLunch: true,
    vacationStart: "2026-05-11",
    vacationEnd: "2026-05-15",
  },
  {
    id: "wrk-3",
    name: "Daniela Vera",
    shiftId: "dia",
    area: "calidad",
    usesTaxi: true,
    hasLunch: true,
    vacationStart: "",
    vacationEnd: "",
  },
  {
    id: "wrk-4",
    name: "Ignacio Perez",
    shiftId: "dia",
    area: "planta",
    usesTaxi: true,
    hasLunch: false,
    vacationStart: "",
    vacationEnd: "",
  },
  {
    id: "wrk-5",
    name: "Fernanda Araya",
    shiftId: "tarde",
    area: "comercial",
    usesTaxi: true,
    hasLunch: true,
    vacationStart: "",
    vacationEnd: "",
  },
  {
    id: "wrk-6",
    name: "Jorge Carrasco",
    shiftId: "tarde",
    area: "bodega",
    usesTaxi: false,
    hasLunch: true,
    vacationStart: "",
    vacationEnd: "",
  },
  {
    id: "wrk-7",
    name: "Mariela Contreras",
    shiftId: "noche",
    area: "mantencion",
    usesTaxi: true,
    hasLunch: false,
    vacationStart: "",
    vacationEnd: "",
  },
  {
    id: "wrk-8",
    name: "Natalia Leiva",
    shiftId: "noche",
    area: "impresion",
    usesTaxi: true,
    hasLunch: false,
    vacationStart: "",
    vacationEnd: "",
  },
];

const DEFAULT_WORKER_FORM = {
  name: "",
  shiftId: "administrativo",
  area: "comercial",
  usesTaxi: true,
  hasLunch: true,
  vacationStart: "",
  vacationEnd: "",
};

const DEFAULT_AREA_OPTIONS = [
  "comercial",
  "bodega",
  "planta",
  "calidad",
  "casino",
  "aseo",
  "rrhh",
  "finanzas",
  "adquisiciones",
  "comercio exterior",
  "deskartable concepcion",
  "locales comerciales",
  "mantencion",
  "impresion",
];

function timeStringToMinutes(value) {
  if (!value || !value.includes(":")) {
    return null;
  }

  const [hours, minutes] = value.split(":").map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return hours * 60 + minutes;
}

function formatMinutesAsHours(totalMinutes) {
  if (typeof totalMinutes !== "number" || Number.isNaN(totalMinutes)) {
    return "--";
  }

  const sign = totalMinutes < 0 ? "-" : "";
  const absoluteMinutes = Math.abs(totalMinutes);
  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;

  return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

function formatCurrency(value) {
  const normalizedValue = Number(value);

  if (Number.isNaN(normalizedValue) || normalizedValue <= 0) {
    return "--";
  }

  return currencyFormatter.format(normalizedValue);
}

function getCurrentMonthMetadata() {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    monthLabel: today.toLocaleDateString("es-CL", {
      month: "long",
      year: "numeric",
    }),
  };
}

function getMondayBasedDayIndex(date) {
  return (date.getDay() + 6) % 7;
}

function getActiveBusinessDayIndexes(allRowsByTab) {
  const activeDayIndexes = new Set();

  Object.values(allRowsByTab).forEach((rows) => {
    rows.forEach((row, rowIndex) => {
      if (rowIndex > 4) {
        return;
      }

      if (row.start && row.end) {
        activeDayIndexes.add(rowIndex);
      }
    });
  });

  return activeDayIndexes;
}

function calculateMonthlyTransferProjection(allRowsByTab) {
  const { year, month, monthLabel } = getCurrentMonthMetadata();
  const activeBusinessDays = getActiveBusinessDayIndexes(allRowsByTab);

  if (activeBusinessDays.size === 0) {
    return {
      totalCost: 0,
      firstActiveLabel: "--",
      lastActiveLabel: "--",
      monthLabel,
    };
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let firstActiveDate = null;
  let lastActiveDate = null;
  let totalCost = 0;

  for (let day = 1; day <= daysInMonth; day += 1) {
    const currentDate = new Date(year, month, day);
    const businessDayIndex = getMondayBasedDayIndex(currentDate);

    if (!activeBusinessDays.has(businessDayIndex)) {
      continue;
    }

    if (!firstActiveDate) {
      firstActiveDate = currentDate;
    }

    lastActiveDate = currentDate;
    const dailyCost = Object.values(allRowsByTab).reduce((sum, rows) => {
      const row = rows[businessDayIndex];

      if (!row || !row.start || !row.end) {
        return sum;
      }

      const rowCost = Number(row.transferCost);

      return !Number.isNaN(rowCost) && rowCost > 0 ? sum + rowCost : sum;
    }, 0);

    totalCost += dailyCost;
  }

  const formatDateLabel = (value) =>
    value
      ? value.toLocaleDateString("es-CL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "--";

  return {
    totalCost,
    firstActiveLabel: formatDateLabel(firstActiveDate),
    lastActiveLabel: formatDateLabel(lastActiveDate),
    monthLabel,
  };
}

function getDurationMinutes(startMinutes, endMinutes) {
  if (startMinutes === null || endMinutes === null) {
    return null;
  }

  if (endMinutes >= startMinutes) {
    return endMinutes - startMinutes;
  }

  return 24 * 60 - startMinutes + endMinutes;
}

function calculateEffectiveHours(startTime, endTime, breakMinutes) {
  const startMinutes = timeStringToMinutes(startTime);
  const endMinutes = timeStringToMinutes(endTime);
  const shiftMinutes = getDurationMinutes(startMinutes, endMinutes);
  const normalizedBreak = Number(breakMinutes);

  if (shiftMinutes === null || Number.isNaN(normalizedBreak)) {
    return null;
  }

  return shiftMinutes - normalizedBreak;
}

function calculateTaxiTime(baseTime, minuteOffset, dayIndex) {
  const baseMinutes = timeStringToMinutes(baseTime);
  const normalizedOffset = Number(minuteOffset);

  if (baseMinutes === null || Number.isNaN(normalizedOffset)) {
    return null;
  }

  const rawMinutes = baseMinutes + normalizedOffset;
  const dayOffset = Math.floor(rawMinutes / (24 * 60));
  const wrappedMinutes = ((rawMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const computedDayIndex = (dayIndex + dayOffset + DAYS.length) % DAYS.length;

  return {
    time: formatMinutesAsHours(wrappedMinutes),
    dayLabel: DAYS[computedDayIndex],
    crossesDay: dayOffset !== 0,
  };
}

function createInitialRows(rows) {
  return rows.map((row) => ({
    ...row,
    breakMinutes: String(row.breakMinutes),
    transferCost: String(row.transferCost),
  }));
}

function buildInitialTabState() {
  return TAB_CONFIGS.reduce((accumulator, tab) => {
    accumulator[tab.id] = createInitialRows(tab.defaultRows);
    return accumulator;
  }, {});
}

function buildInitialWorkersState() {
  return INITIAL_WORKERS;
}

function normalizeImportedWorkers(rawWorkers) {
  if (Array.isArray(rawWorkers)) {
    return rawWorkers
      .filter((worker) => typeof worker?.name === "string" && worker.name.trim())
      .map((worker, index) => ({
        id: worker.id || `wrk-${index + 1}`,
        name: worker.name.trim(),
        shiftId: TAB_CONFIGS.some((tab) => tab.id === worker.shiftId)
          ? worker.shiftId
          : "administrativo",
        area: typeof worker.area === "string" && worker.area.trim()
          ? worker.area.trim().toLowerCase()
          : "comercial",
        usesTaxi: Boolean(worker.usesTaxi),
        hasLunch:
          worker.hasLunch === undefined ? true : Boolean(worker.hasLunch),
        vacationStart:
          typeof worker.vacationStart === "string" ? worker.vacationStart : "",
        vacationEnd:
          typeof worker.vacationEnd === "string" ? worker.vacationEnd : "",
      }));
  }

  return TAB_CONFIGS.flatMap((tab) => {
    const importedWorkers = Array.isArray(rawWorkers?.[tab.id])
      ? rawWorkers[tab.id]
      : [];

    return importedWorkers
      .filter((worker) => typeof worker?.name === "string" && worker.name.trim())
      .map((worker, index) => ({
        id: worker.id || `${tab.id}-${index + 1}`,
        name: worker.name.trim(),
        shiftId: tab.id,
        area: "comercial",
        usesTaxi: Boolean(worker.usesTaxi),
        hasLunch: true,
        vacationStart: "",
        vacationEnd: "",
      }));
  });
}

function normalizeImportedAreaOptions(rawAreas, workers) {
  const baseAreas = Array.isArray(rawAreas)
    ? rawAreas
        .filter((area) => typeof area === "string" && area.trim())
        .map((area) => area.trim().toLowerCase())
    : [];
  const workerAreas = workers
    .map((worker) => worker.area)
    .filter((area) => typeof area === "string" && area.trim());

  return Array.from(new Set([...DEFAULT_AREA_OPTIONS, ...baseAreas, ...workerAreas]));
}

function getShiftLabel(shiftId) {
  const label = TAB_CONFIGS.find((tab) => tab.id === shiftId)?.label || shiftId;
  return label.replace(/^Turno\s+/i, "");
}

function hasVacationScheduled(worker) {
  return Boolean(worker.vacationStart || worker.vacationEnd);
}

function normalizeImportedRow(row, fallbackDay) {
  return {
    day: row?.day || fallbackDay,
    start: typeof row?.start === "string" ? row.start : "",
    end: typeof row?.end === "string" ? row.end : "",
    breakMinutes:
      row?.breakMinutes !== undefined ? String(row.breakMinutes) : "0",
    taxiPickupPoint:
      typeof row?.taxiPickupPoint === "string" ? row.taxiPickupPoint : "",
    transferCost:
      row?.transferCost !== undefined ? String(row.transferCost) : "0",
  };
}

function normalizeImportedTabState(rawTabs) {
  return TAB_CONFIGS.reduce((accumulator, tab) => {
    const importedRows = Array.isArray(rawTabs?.[tab.id]) ? rawTabs[tab.id] : [];

    accumulator[tab.id] = DAYS.map((day, index) =>
      normalizeImportedRow(importedRows[index], day)
    );

    return accumulator;
  }, {});
}

function buildExportPayload({
  activeTab,
  taxiLeadMinutes,
  taxiReturnMinutes,
  tabState,
  workerState,
  areaOptions,
}) {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    activeTab,
    taxiLeadMinutes,
    taxiReturnMinutes,
    tabs: tabState,
    workers: workerState,
    areaOptions,
  };
}

function downloadJsonFile(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });

  downloadBlob(blob, filename);
}

function getRowValidation(row) {
  const startMinutes = timeStringToMinutes(row.start);
  const endMinutes = timeStringToMinutes(row.end);
  const breakMinutes = Number(row.breakMinutes);
  const transferCost = Number(row.transferCost);

  if (!row.start && !row.end) {
    return "";
  }

  if (startMinutes === null || endMinutes === null) {
    return "Completa entrada y salida.";
  }

  if (Number.isNaN(breakMinutes) || breakMinutes < 0) {
    return "La colacion debe ser un numero positivo.";
  }

  if (!row.taxiPickupPoint.trim()) {
    return "Indica el punto de salida del taxi.";
  }

  if (Number.isNaN(transferCost) || transferCost < 0) {
    return "El costo debe ser un numero positivo.";
  }

  const effectiveMinutes = calculateEffectiveHours(
    row.start,
    row.end,
    row.breakMinutes
  );

  if (effectiveMinutes !== null && effectiveMinutes < 0) {
    return "La colacion supera la duracion del turno.";
  }

  return "";
}

function escapePdfText(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r/g, "")
    .replace(/\n/g, " ");
}

function wrapPdfLine(line, maxChars = PDF_MAX_CHARS) {
  if (line.length <= maxChars) {
    return [line];
  }

  const words = line.split(" ");
  const wrapped = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;

    if (next.length > maxChars) {
      if (current) {
        wrapped.push(current);
      }

      current = word;
      return;
    }

    current = next;
  });

  if (current) {
    wrapped.push(current);
  }

  return wrapped;
}

function paginatePdfLines(lines) {
  const expandedLines = lines.flatMap((line) => wrapPdfLine(line));
  const pages = [];

  for (let index = 0; index < expandedLines.length; index += PDF_LINES_PER_PAGE) {
    pages.push(expandedLines.slice(index, index + PDF_LINES_PER_PAGE));
  }

  return pages.length ? pages : [["Sin informacion para exportar."]];
}

function buildPdfBlob(linesByPage) {
  const encoder = new TextEncoder();
  const fontObjectId = 3;
  const firstContentObjectId = 4;
  const firstPageObjectId = firstContentObjectId + linesByPage.length;
  const pageObjectIds = linesByPage.map(
    (_, index) => firstPageObjectId + index
  );
  const contentObjectIds = linesByPage.map(
    (_, index) => firstContentObjectId + index
  );
  const objects = [];

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Count ${pageObjectIds.length} /Kids [${pageObjectIds
    .map((pageId) => `${pageId} 0 R`)
    .join(" ")}] >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  linesByPage.forEach((pageLines, index) => {
    const textCommands = [
      "BT",
      "/F1 11 Tf",
      `${PDF_MARGIN_X} ${PDF_START_Y} Td`,
      `${PDF_LINE_HEIGHT} TL`,
      ...pageLines.map((line, lineIndex) =>
        lineIndex === 0
          ? `(${escapePdfText(line)}) Tj`
          : `T* (${escapePdfText(line)}) Tj`
      ),
      "ET",
    ];
    const stream = textCommands.join("\n");
    const streamLength = encoder.encode(stream).length;
    const contentObjectId = contentObjectIds[index];
    const pageObjectId = pageObjectIds[index];

    objects[contentObjectId] =
      `<< /Length ${streamLength} >>\nstream\n${stream}\nendstream`;
    objects[pageObjectId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PDF_PAGE_WIDTH} ${PDF_PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>`;
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let objectId = 1; objectId < objects.length; objectId += 1) {
    offsets[objectId] = encoder.encode(pdf).length;
    pdf += `${objectId} 0 obj\n${objects[objectId]}\nendobj\n`;
  }

  const xrefOffset = encoder.encode(pdf).length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";
  for (let objectId = 1; objectId < objects.length; objectId += 1) {
    pdf += `${String(offsets[objectId]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 300);
}

function buildTurnPdfLines({
  tabLabel,
  rows,
  taxiLeadMinutes,
  taxiReturnMinutes,
  includeHeader = true,
}) {
  const lines = [];

  if (includeHeader) {
    lines.push(`Planificador de turnos - ${tabLabel}`);
    lines.push(`Generado el ${new Date().toLocaleDateString("es-CL")}`);
    lines.push("");
  }

  rows.forEach((row, rowIndex) => {
    const taxiToWork = calculateTaxiTime(row.start, -Number(taxiLeadMinutes), rowIndex);
    const taxiFromWork = calculateTaxiTime(
      row.end,
      Number(taxiReturnMinutes),
      rowIndex
    );

    lines.push(`${row.day}`);
    lines.push(`Entrada: ${row.start || "--"} | Salida: ${row.end || "--"}`);
    lines.push(`Punto de salida del taxi: ${row.taxiPickupPoint || "--"}`);
    lines.push(
      `Taxi hacia el lugar de trabajo: ${taxiToWork ? `${taxiToWork.time} desde ${taxiToWork.dayLabel}` : "--"}`
    );
    lines.push(
      `Taxi desde el lugar de trabajo: ${taxiFromWork ? `${taxiFromWork.time} hacia ${row.taxiPickupPoint || "--"} (${taxiFromWork.dayLabel})` : "--"}`
    );
    lines.push("");
  });

  return lines;
}

function App() {
  const [activeSection, setActiveSection] = useState("turnos");
  const [activeTab, setActiveTab] = useState(TAB_CONFIGS[0].id);
  const [taxiLeadMinutes, setTaxiLeadMinutes] = useState("45");
  const [taxiReturnMinutes, setTaxiReturnMinutes] = useState("15");
  const [tabState, setTabState] = useState(buildInitialTabState);
  const [workerState, setWorkerState] = useState(buildInitialWorkersState);
  const [areaOptions, setAreaOptions] = useState(DEFAULT_AREA_OPTIONS);
  const [workerForm, setWorkerForm] = useState(DEFAULT_WORKER_FORM);
  const [areaDraft, setAreaDraft] = useState("");
  const [fileMessage, setFileMessage] = useState("");

  const activeConfig = TAB_CONFIGS.find((tab) => tab.id === activeTab);
  const activeRows = tabState[activeTab];
  const activeWorkers = workerState.filter(
    (worker) => worker.shiftId === activeTab
  );
  const activeAvailableWorkers = activeWorkers.filter(
    (worker) => !hasVacationScheduled(worker)
  );
  const activeTaxiWorkersCount = activeAvailableWorkers.filter(
    (worker) => worker.usesTaxi
  ).length;
  const activeLunchWorkersCount = activeAvailableWorkers.filter(
    (worker) => worker.hasLunch
  ).length;
  const workingWorkersCount = workerState.filter(
    (worker) => !hasVacationScheduled(worker)
  ).length;
  const lunchWorkersCount = workerState.filter(
    (worker) => !hasVacationScheduled(worker) && worker.hasLunch
  ).length;
  const taxiWorkersCount = workerState.filter(
    (worker) => !hasVacationScheduled(worker) && worker.usesTaxi
  ).length;
  const vacationWorkersCount = workerState.filter((worker) =>
    hasVacationScheduled(worker)
  ).length;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleGlobalNumberChange = (setter) => (event) => {
    const nextValue = event.target.value;

    if (nextValue === "") {
      setter("");
      return;
    }

    const numericValue = Number(nextValue);

    if (Number.isNaN(numericValue) || numericValue < 0) {
      return;
    }

    setter(String(numericValue));
  };

  const updateTabCell = (tabId, rowIndex, field, value) => {
    setTabState((previousState) => ({
      ...previousState,
      [tabId]: previousState[tabId].map((row, currentIndex) =>
        currentIndex === rowIndex ? { ...row, [field]: value } : row
      ),
    }));
  };

  const weeklyTotalMinutes = useMemo(
    () =>
      activeRows.reduce((total, row) => {
        const effectiveMinutes = calculateEffectiveHours(
          row.start,
          row.end,
          row.breakMinutes
        );

        if (effectiveMinutes === null || effectiveMinutes < 0) {
          return total;
        }

        return total + effectiveMinutes;
      }, 0),
    [activeRows]
  );

  const weeklyTransferCost = useMemo(
    () =>
      activeRows.reduce((total, row) => {
        const value = Number(row.transferCost);
        return Number.isNaN(value) || value < 0 ? total : total + value;
      }, 0),
    [activeRows]
  );

  const weeklyLimitExceeded = weeklyTotalMinutes > 42 * 60;
  const monthlyProjection = useMemo(
    () => calculateMonthlyTransferProjection(tabState),
    [tabState]
  );

  const downloadSingleTurnPdf = (tabConfig) => {
    const lines = buildTurnPdfLines({
      tabLabel: tabConfig.label,
      rows: tabState[tabConfig.id],
      taxiLeadMinutes,
      taxiReturnMinutes,
    });

    const blob = buildPdfBlob(paginatePdfLines(lines));
    downloadBlob(blob, `${tabConfig.label.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  };

  const downloadAllTurnsPdf = () => {
    const lines = TAB_CONFIGS.flatMap((tabConfig, index) => {
      const sectionLines = buildTurnPdfLines({
        tabLabel: tabConfig.label,
        rows: tabState[tabConfig.id],
        taxiLeadMinutes,
        taxiReturnMinutes,
        includeHeader: index === 0,
      });

      return index === 0
        ? sectionLines
        : ["", "----------------------------------------", "", ...sectionLines];
    });

    const blob = buildPdfBlob(paginatePdfLines(lines));
    downloadBlob(blob, "todos-los-turnos.pdf");
  };

  const exportPlanningFile = () => {
    const payload = buildExportPayload({
      activeTab,
      taxiLeadMinutes,
      taxiReturnMinutes,
      tabState,
      workerState,
      areaOptions,
    });

    const exportDate = new Date().toISOString().slice(0, 10);
    downloadJsonFile(payload, `planificacion-turnos-${exportDate}.json`);
    setFileMessage("Planificacion exportada correctamente.");
  };

  const importPlanningFile = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!parsed || typeof parsed !== "object" || !parsed.tabs) {
        throw new Error("Archivo invalido");
      }

      const normalizedTabs = normalizeImportedTabState(parsed.tabs);
      const normalizedWorkers = normalizeImportedWorkers(parsed.workers);
      const normalizedAreas = normalizeImportedAreaOptions(
        parsed.areaOptions,
        normalizedWorkers
      );
      setTabState(normalizedTabs);
      setWorkerState(normalizedWorkers);
      setAreaOptions(normalizedAreas);
      setTaxiLeadMinutes(
        parsed.taxiLeadMinutes !== undefined
          ? String(parsed.taxiLeadMinutes)
          : "45"
      );
      setTaxiReturnMinutes(
        parsed.taxiReturnMinutes !== undefined
          ? String(parsed.taxiReturnMinutes)
          : "15"
      );
      setActiveTab(
        TAB_CONFIGS.some((tab) => tab.id === parsed.activeTab)
          ? parsed.activeTab
          : TAB_CONFIGS[0].id
      );
      setFileMessage("Planificacion importada correctamente.");
    } catch (error) {
      setFileMessage(
        "No se pudo importar el archivo. Verifica que sea una planificacion valida."
      );
    } finally {
      event.target.value = "";
    }
  };

  const updateWorkerForm = (field, value) => {
    setWorkerForm((previousState) => ({
      ...previousState,
      [field]: value,
    }));
  };

  const addWorker = () => {
    const normalizedName = workerForm.name.trim();

    if (!normalizedName) {
      setFileMessage("Ingresa un nombre de trabajador antes de agregarlo.");
      return;
    }

    setWorkerState((previousState) => [
      ...previousState,
      {
        id: `wrk-${Date.now()}`,
        name: normalizedName,
        shiftId: workerForm.shiftId,
        area: workerForm.area,
        usesTaxi: workerForm.usesTaxi,
        hasLunch: workerForm.hasLunch,
        vacationStart: workerForm.vacationStart,
        vacationEnd: workerForm.vacationEnd,
      },
    ]);
    setAreaOptions((previousState) =>
      previousState.includes(workerForm.area)
        ? previousState
        : [...previousState, workerForm.area]
    );
    setWorkerForm(DEFAULT_WORKER_FORM);
    setFileMessage("Trabajador agregado al padron.");
  };

  const updateWorkerField = (workerId, field, value) => {
    setWorkerState((previousState) =>
      previousState.map((worker) =>
        worker.id === workerId ? { ...worker, [field]: value } : worker
      )
    );
  };

  const removeWorker = (workerId) => {
    setWorkerState((previousState) =>
      previousState.filter((worker) => worker.id !== workerId)
    );
  };

  const addAreaOption = () => {
    const normalizedArea = areaDraft.trim().toLowerCase();

    if (!normalizedArea) {
      setFileMessage("Ingresa un area antes de agregarla.");
      return;
    }

    if (areaOptions.includes(normalizedArea)) {
      setFileMessage("Esa area ya existe.");
      return;
    }

    setAreaOptions((previousState) => [...previousState, normalizedArea]);
    setAreaDraft("");
    setFileMessage("Area agregada correctamente.");
  };

  const removeAreaOption = (areaToRemove) => {
    setAreaOptions((previousState) =>
      previousState.filter((area) => area !== areaToRemove)
    );
    setWorkerState((previousState) =>
      previousState.map((worker) =>
        worker.area === areaToRemove
          ? { ...worker, area: DEFAULT_WORKER_FORM.area }
          : worker
      )
    );
    setFileMessage("Area eliminada y trabajadores reasignados a comercial.");
  };

  return (
    <div className="scheduler-app">
      <header className="hero-panel">
        <div className="hero-copy-block">
          <div className="hero-topline">
            <span className="eyebrow">Planificador semanal</span>
            <span className="hero-kicker">
              Dotacion organizada en {TAB_CONFIGS.length} turnos
            </span>
          </div>
          <h1>Turnos laborales con calculo automatico de horas y taxi</h1>
          <p className="hero-copy">
            Edita turnos y revisa al instante horas efectivas, salida de taxi,
            costo semanal y baja reportes PDF.
          </p>

          <div className="hero-actions">
            <div className="action-row">
              <button
                type="button"
                className="action-button secondary"
                onClick={exportPlanningFile}
              >
                Exportar planificacion
              </button>
              <label className="action-button secondary file-button">
                Importar planificacion
                <input
                  type="file"
                  accept="application/json,.json"
                  onChange={importPlanningFile}
                />
              </label>
              <button
                type="button"
                className="action-button"
                onClick={() => downloadSingleTurnPdf(activeConfig)}
              >
                Descargar PDF del turno
              </button>
              <button
                type="button"
                className="action-button secondary"
                onClick={downloadAllTurnsPdf}
              >
                Descargar PDF de todos los turnos
              </button>
            </div>
            {fileMessage ? <span className="file-message">{fileMessage}</span> : null}
          </div>
        </div>

        <div className="hero-metrics">
          <div className="summary-card">
            <p className="summary-inline">
              <span>Vista activa</span> <strong>{activeConfig.label}</strong>
            </p>
            <div className="summary-stack">
              <div className="summary-row">
                <span>Total semanal</span>
                <strong>{formatMinutesAsHours(weeklyTotalMinutes)}</strong>
              </div>
              <div className="summary-row">
                <span>Costo semanal</span>
                <strong>{formatCurrency(weeklyTransferCost)}</strong>
              </div>
              <div className="summary-row feature">
                <span>Total mensual 4 turnos</span>
                <strong>{formatCurrency(monthlyProjection.totalCost)}</strong>
              </div>
            </div>
            <p className="summary-footnote-inline">
              Periodo considerado {monthlyProjection.firstActiveLabel} al{" "}
              {monthlyProjection.lastActiveLabel} {monthlyProjection.monthLabel}
            </p>
          </div>
        </div>
      </header>

      <main className="workspace-shell">
        <section className="section-switcher" aria-label="Vistas principales">
          <button
            type="button"
            className={`section-button ${activeSection === "turnos" ? "active" : ""}`}
            onClick={() => handleSectionChange("turnos")}
          >
            Turnos
          </button>
          <button
            type="button"
            className={`section-button ${
              activeSection === "trabajadores" ? "active" : ""
            }`}
            onClick={() => handleSectionChange("trabajadores")}
          >
            Trabajadores
          </button>
        </section>

        {activeSection === "turnos" ? (
          <section className="turns-view">
            <section className="tab-row" aria-label="Turnos disponibles">
              {TAB_CONFIGS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`tab-button ${tab.id === activeTab ? "active" : ""}`}
                  style={
                    tab.id === activeTab
                      ? { "--tab-accent": tab.accent }
                      : undefined
                  }
                  onClick={() => handleTabChange(tab.id)}
                >
                  <span>{tab.label}</span>
                  <small>
                    {formatMinutesAsHours(
                      tabState[tab.id].reduce((total, row) => {
                        const rowMinutes = calculateEffectiveHours(
                          row.start,
                          row.end,
                          row.breakMinutes
                        );

                        return rowMinutes && rowMinutes > 0
                          ? total + rowMinutes
                          : total;
                      }, 0)
                    )}
                  </small>
                </button>
              ))}
            </section>

            <section className="table-card">
              <div className="table-header">
              <div>
                  <span className="section-tag">{activeConfig.label}</span>
              </div>
              </div>

              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Dia</th>
                      <th>Hora Entrada</th>
                      <th>Hora Salida</th>
                      <th>Colacion (min)</th>
                      <th>Horas Efectivas</th>
                      <th>Punto Salida Taxi</th>
                      <th>Taxi Hacia Trabajo</th>
                      <th>Taxi Desde Trabajo</th>
                      <th>Costo Traslado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRows.map((row, rowIndex) => {
                      const effectiveMinutes = calculateEffectiveHours(
                        row.start,
                        row.end,
                        row.breakMinutes
                      );
                      const taxiToWork = calculateTaxiTime(
                        row.start,
                        -Number(taxiLeadMinutes),
                        rowIndex
                      );
                      const taxiFromWork = calculateTaxiTime(
                        row.end,
                        Number(taxiReturnMinutes),
                        rowIndex
                      );
                      const validationMessage = getRowValidation(row);

                      return (
                        <tr
                          key={`${activeTab}-${row.day}`}
                          className={validationMessage ? "row-has-error" : ""}
                        >
                          <td>
                            <div className="day-cell">
                              <strong>{row.day}</strong>
                              {validationMessage ? (
                                <span className="inline-error">
                                  {validationMessage}
                                </span>
                              ) : null}
                            </div>
                          </td>
                          <td>
                            <input
                              type="time"
                              value={row.start}
                              onChange={(event) =>
                                updateTabCell(
                                  activeTab,
                                  rowIndex,
                                  "start",
                                  event.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              value={row.end}
                              onChange={(event) =>
                                updateTabCell(
                                  activeTab,
                                  rowIndex,
                                  "end",
                                  event.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              step="5"
                              value={row.breakMinutes}
                              onChange={(event) =>
                                updateTabCell(
                                  activeTab,
                                  rowIndex,
                                  "breakMinutes",
                                  event.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <span
                              className={`calculated-pill ${
                                effectiveMinutes !== null && effectiveMinutes < 0
                                  ? "negative"
                                  : ""
                              }`}
                            >
                              {effectiveMinutes === null
                                ? "--"
                                : formatMinutesAsHours(effectiveMinutes)}
                            </span>
                          </td>
                          <td>
                            <div className="pickup-cell">
                              <input
                                type="text"
                                value={row.taxiPickupPoint}
                                placeholder="Ej: Metro Los Heroes"
                                onChange={(event) =>
                                  updateTabCell(
                                    activeTab,
                                    rowIndex,
                                    "taxiPickupPoint",
                                    event.target.value
                                  )
                                }
                              />
                              <span className="pickup-meta">
                                {activeTaxiWorkersCount} personas en este trayecto
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="taxi-cell">
                              <strong>{taxiToWork ? taxiToWork.time : "--"}</strong>
                              <span>
                                {taxiToWork
                                  ? `Desde ${
                                      row.taxiPickupPoint || "punto pendiente"
                                    }`
                                  : "Sin dato"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="taxi-cell">
                              <strong>
                                {taxiFromWork ? taxiFromWork.time : "--"}
                              </strong>
                              <span>
                                {taxiFromWork
                                  ? `Hacia ${
                                      row.taxiPickupPoint || "destino pendiente"
                                    }`
                                  : "Sin dato"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="cost-cell">
                              <input
                                type="number"
                                min="0"
                                step="100"
                                value={row.transferCost}
                                onChange={(event) =>
                                  updateTabCell(
                                    activeTab,
                                    rowIndex,
                                    "transferCost",
                                    event.target.value
                                  )
                                }
                              />
                              <span>{formatCurrency(row.transferCost)}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5">
                        <div className="total-label">
                          <strong>Total horas semanales</strong>
                          <span>
                            Limite de referencia: 42:00 horas por pestaña
                          </span>
                        </div>
                      </td>
                      <td colSpan="4">
                        <div
                          className={`total-value ${
                            weeklyLimitExceeded ? "is-over-limit" : ""
                          }`}
                        >
                          <strong>
                            {formatMinutesAsHours(weeklyTotalMinutes)}
                          </strong>
                          <span>
                            {weeklyLimitExceeded
                              ? "Excede el umbral recomendado"
                              : "Dentro del rango esperado"}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5">
                        <div className="total-label">
                          <strong>Total traslado semanal</strong>
                          <span>Visible solo en la app, excluido del PDF</span>
                        </div>
                      </td>
                      <td colSpan="4">
                        <div className="total-value neutral">
                          <strong>{formatCurrency(weeklyTransferCost)}</strong>
                          <span>Estimado en pesos chilenos</span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="lead-grid lead-grid-bottom">
                <label className="lead-field" htmlFor="taxiLeadMinutes">
                  <span>Minutos antes de entrada</span>
                  <input
                    id="taxiLeadMinutes"
                    type="number"
                    min="0"
                    step="5"
                    value={taxiLeadMinutes}
                    onChange={handleGlobalNumberChange(setTaxiLeadMinutes)}
                  />
                  <small>Hora en que sale el taxi hacia el trabajo.</small>
                </label>

                <label
                  className="lead-field secondary"
                  htmlFor="taxiReturnMinutes"
                >
                  <span>Minutos despues de salida</span>
                  <input
                    id="taxiReturnMinutes"
                    type="number"
                    min="0"
                    step="5"
                    value={taxiReturnMinutes}
                    onChange={handleGlobalNumberChange(setTaxiReturnMinutes)}
                  />
                  <small>
                    Hora en que sale el taxi desde el lugar de trabajo.
                  </small>
                </label>
              </div>

              <div className="workers-panel">
                <div className="workers-header">
                  <div>
                    <span className="section-tag">Dotacion del turno</span>
                    <h3>Dotacion {activeConfig.label}</h3>
                  </div>
                  <div className="workers-summary">
                    <strong>{activeWorkers.length}</strong>
                    <span>
                      {activeTaxiWorkersCount} usan taxi · {activeLunchWorkersCount} almuerzan
                    </span>
                  </div>
                </div>

                <div className="workers-list">
                  {activeWorkers.length > 0 ? (
                    activeWorkers.map((worker) => (
                      <div key={worker.id} className="worker-card">
                        <div>
                          <strong>{worker.name}</strong>
                          <span>
                            {hasVacationScheduled(worker)
                              ? "De vacaciones"
                              : `${worker.usesTaxi ? "Con taxi" : "Sin taxi"} · ${
                                  worker.hasLunch ? "Almuerza" : "Sin almuerzo"
                                }`}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="workers-empty">
                      Sin trabajadores cargados.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </section>
        ) : (
          <section className="table-card worker-management-card">
            <div className="table-header">
              <div>
                <span className="section-tag">Padron general</span>
              </div>
            </div>

            <div className="worker-form-grid">
              <input
                type="text"
                value={workerForm.name}
                placeholder="Nombre del trabajador"
                onChange={(event) => updateWorkerForm("name", event.target.value)}
              />
              <select
                value={workerForm.shiftId}
                onChange={(event) =>
                  updateWorkerForm("shiftId", event.target.value)
                }
              >
                {TAB_CONFIGS.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
              <select
                value={workerForm.area}
                onChange={(event) => updateWorkerForm("area", event.target.value)}
              >
                {areaOptions.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <select
                value={workerForm.usesTaxi ? "si" : "no"}
                onChange={(event) =>
                  updateWorkerForm("usesTaxi", event.target.value === "si")
                }
              >
                <option value="si">Taxi: Si</option>
                <option value="no">Taxi: No</option>
              </select>
              <select
                value={workerForm.hasLunch ? "si" : "no"}
                onChange={(event) =>
                  updateWorkerForm("hasLunch", event.target.value === "si")
                }
              >
                <option value="si">Almuerza: Si</option>
                <option value="no">Almuerza: No</option>
              </select>
              <input
                type="date"
                value={workerForm.vacationStart}
                onChange={(event) =>
                  updateWorkerForm("vacationStart", event.target.value)
                }
              />
              <input
                type="date"
                value={workerForm.vacationEnd}
                onChange={(event) =>
                  updateWorkerForm("vacationEnd", event.target.value)
                }
              />
              <button
                type="button"
                className="action-button"
                onClick={addWorker}
              >
                Agregar trabajador
              </button>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Trabajador</th>
                    <th>Turno</th>
                    <th>Area</th>
                    <th>Taxi</th>
                    <th>Almuerza</th>
                    <th>Vacaciones desde</th>
                    <th>Vacaciones hasta</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {workerState.map((worker) => (
                    <tr key={worker.id}>
                      <td>
                        <input
                          type="text"
                          value={worker.name}
                          onChange={(event) =>
                            updateWorkerField(worker.id, "name", event.target.value)
                          }
                        />
                      </td>
                      <td>
                        <select
                          value={worker.shiftId}
                          onChange={(event) =>
                            updateWorkerField(worker.id, "shiftId", event.target.value)
                          }
                        >
                          {TAB_CONFIGS.map((tab) => (
                            <option key={tab.id} value={tab.id}>
                              {getShiftLabel(tab.id)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={worker.area}
                          onChange={(event) =>
                            updateWorkerField(worker.id, "area", event.target.value)
                          }
                        >
                          {areaOptions.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={worker.usesTaxi ? "si" : "no"}
                          onChange={(event) =>
                            updateWorkerField(
                              worker.id,
                              "usesTaxi",
                              event.target.value === "si"
                            )
                          }
                        >
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={worker.hasLunch ? "si" : "no"}
                          onChange={(event) =>
                            updateWorkerField(
                              worker.id,
                              "hasLunch",
                              event.target.value === "si"
                            )
                          }
                        >
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="date"
                          value={worker.vacationStart}
                          onChange={(event) =>
                            updateWorkerField(
                              worker.id,
                              "vacationStart",
                              event.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={worker.vacationEnd}
                          onChange={(event) =>
                            updateWorkerField(
                              worker.id,
                              "vacationEnd",
                              event.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="ghost-button"
                          onClick={() => removeWorker(worker.id)}
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="worker-summary-panel">
              <div className="table-header compact">
                <div>
                  <span className="section-tag">Resumen de trabajadores</span>
                </div>
              </div>
              <div className="frequency-strip">
                <div className="frequency-card">
                  <strong>{workingWorkersCount}</strong>
                  <span>Viene a trabajar</span>
                </div>
                <div className="frequency-card">
                  <strong>{lunchWorkersCount}</strong>
                  <span>Almuerza</span>
                </div>
                <div className="frequency-card">
                  <strong>{taxiWorkersCount}</strong>
                  <span>Usa taxi</span>
                </div>
                <div className="frequency-card">
                  <strong>{vacationWorkersCount}</strong>
                  <span>Vacaciones</span>
                </div>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Trabajador</th>
                      <th>Turno</th>
                      <th>Area</th>
                      <th>Viene a trabajar</th>
                      <th>Almuerza</th>
                      <th>Usa taxi</th>
                      <th>Vacaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workerState.map((worker) => {
                      const onVacation = hasVacationScheduled(worker);

                      return (
                        <tr key={`summary-${worker.id}`}>
                          <td>{worker.name}</td>
                          <td>{getShiftLabel(worker.shiftId)}</td>
                          <td>{worker.area}</td>
                          <td>{onVacation ? "No" : "Si"}</td>
                          <td>{!onVacation && worker.hasLunch ? "Si" : "No"}</td>
                          <td>{!onVacation && worker.usesTaxi ? "Si" : "No"}</td>
                          <td>
                            {onVacation
                              ? `${worker.vacationStart || "--"} al ${
                                  worker.vacationEnd || "--"
                                }`
                              : "No"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="area-manager">
              <div className="area-manager-form">
                <input
                  type="text"
                  value={areaDraft}
                  placeholder="Nueva area"
                  onChange={(event) => setAreaDraft(event.target.value)}
                />
                <button
                  type="button"
                  className="action-button secondary"
                  onClick={addAreaOption}
                >
                  Agregar area
                </button>
              </div>
              <div className="area-chip-row">
                {areaOptions.map((area) => (
                  <button
                    key={area}
                    type="button"
                    className="area-chip"
                    onClick={() => removeAreaOption(area)}
                  >
                    {area} ×
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
