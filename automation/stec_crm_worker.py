#!/usr/bin/env python3
"""Minimal worker to normalize registrants into the STEC CRM import format.

The module intentionally uses only the Python standard library so it can run
easily in a small DigitalOcean droplet without an extra dependency step.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import unicodedata
import xml.etree.ElementTree as ET
import zipfile
from dataclasses import dataclass
from datetime import datetime, timedelta
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from io import StringIO
from pathlib import Path
from typing import Any


NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "rel": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pkg": "http://schemas.openxmlformats.org/package/2006/relationships",
}

DEFAULT_TEMPLATE = (
    "/Users/carlosalbornoz/Desktop/TDR Cooperativas/Forms STEC/"
    "Nomina inscritos CRM.xlsx"
)

SOURCE_ALIASES = {
    "recordname": "documento",
    "tipodeidentificacion_c": "tipo_identificacion",
    "nombres_c": "nombres",
    "apellidopaterno_c": "apellido_paterno",
    "apellidomaterno_c": "apellido_materno",
    "correoelectronico_c": "email",
    "tipodecorreo_c": "tipo_correo",
    "telefonomovil_c": "telefono",
    "paisdeorigen_c": "pais_origen",
    "gender_c": "genero",
    "fechadenacimiento_c": "fecha_nacimiento",
    "estadocivil_c": "estado_civil",
    "nacionalidad_c": "nacionalidad",
    "pais_c": "pais_residencia",
    "direccion_c": "direccion",
    "comuna_c": "comuna",
}

DEFAULTS = {
    "TipoDeCorreo_c": "PERSONAL",
    "TipoDeIdentificacion_c": "C",
    "PaisDeOrigen_c": "CL",
    "Pais_c": "CL",
    "Nacionalidad_c": "1",
}

GENDER_CODES = {
    "mujer": "FEMALE",
    "femenino": "FEMALE",
    "female": "FEMALE",
    "f": "FEMALE",
    "hombre": "MALE",
    "masculino": "MALE",
    "male": "MALE",
    "m": "MALE",
    "no binario": "3",
    "nobinario": "3",
    "non binary": "3",
    "sin informacion": "0",
    "sin información": "0",
}

NATIONALITY_CODES = {
    "chilena": "1",
    "chileno": "1",
    "chile": "1",
    "extranjera": "2",
    "extranjero": "2",
    "espanola": "2",
    "española": "2",
    "espanol": "2",
    "español": "2",
}

ID_TYPE_CODES = {
    "rut": "C",
    "cedula": "C",
    "cédula": "C",
    "dni": "C",
    "pasaporte": "P",
    "passport": "P",
}


def strip_accents(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    return "".join(ch for ch in normalized if not unicodedata.combining(ch))


def canonical(value: Any) -> str:
    text = str(value or "").strip()
    text = strip_accents(text).lower()
    return re.sub(r"\s+", " ", text)


def alnum_upper(value: Any) -> str:
    return re.sub(r"[^0-9A-Za-z]", "", str(value or "")).upper()


def digits_only(value: Any) -> str:
    return re.sub(r"\D", "", str(value or ""))


def title_text(value: Any) -> str:
    words = re.split(r"\s+", str(value or "").strip())
    return " ".join(word.capitalize() for word in words if word)


def normalize_date(value: Any) -> str:
    text = str(value or "").strip()
    if not text:
        return ""
    if re.fullmatch(r"\d+(?:\.0+)?", text):
        serial = int(float(text))
        if serial > 20000:
            base = datetime(1899, 12, 30)
            return (base + timedelta(days=serial)).strftime("%Y-%m-%d")
    for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y", "%Y/%m/%d", "%d.%m.%Y"):
        try:
            return datetime.strptime(text, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return text


@dataclass
class TemplateContext:
    columns: list[str]
    misc_catalogs: dict[str, dict[str, str]]
    country_codes: dict[str, str]
    commune_codes: dict[str, str]
    commune_postal_codes: dict[str, str]


class WorkbookReader:
    def __init__(self, xlsx_path: str | Path) -> None:
        self.path = Path(xlsx_path)
        self.zip = zipfile.ZipFile(self.path)
        self.shared_strings = self._load_shared_strings()
        self.sheet_targets = self._load_sheet_targets()

    def _load_shared_strings(self) -> list[str]:
        if "xl/sharedStrings.xml" not in self.zip.namelist():
            return []
        root = ET.fromstring(self.zip.read("xl/sharedStrings.xml"))
        items: list[str] = []
        for node in root.findall("main:si", NS):
            parts = [text.text or "" for text in node.iterfind(".//main:t", NS)]
            items.append("".join(parts))
        return items

    def _load_sheet_targets(self) -> dict[str, str]:
        wb = ET.fromstring(self.zip.read("xl/workbook.xml"))
        rels = ET.fromstring(self.zip.read("xl/_rels/workbook.xml.rels"))
        rel_map = {
            rel.attrib["Id"]: rel.attrib["Target"]
            for rel in rels.findall("pkg:Relationship", NS)
        }
        targets: dict[str, str] = {}
        for sheet in wb.findall("main:sheets/main:sheet", NS):
            name = sheet.attrib["name"]
            rel_id = sheet.attrib[
                "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
            ]
            targets[name] = f"xl/{rel_map[rel_id]}"
        return targets

    def rows(self, sheet_name: str) -> list[dict[str, str]]:
        target = self.sheet_targets[sheet_name]
        root = ET.fromstring(self.zip.read(target))
        rows: list[dict[str, str]] = []
        for row in root.findall("main:sheetData/main:row", NS):
            data: dict[str, str] = {}
            for cell in row.findall("main:c", NS):
                ref = cell.attrib.get("r", "")
                col = re.sub(r"\d+", "", ref)
                value = self._cell_value(cell)
                data[col] = value
            rows.append(data)
        return rows

    def _cell_value(self, cell: ET.Element) -> str:
        cell_type = cell.attrib.get("t")
        value = ""
        raw = cell.find("main:v", NS)
        if raw is not None and raw.text is not None:
            if cell_type == "s":
                idx = int(raw.text)
                value = self.shared_strings[idx]
            else:
                value = raw.text
        inline = cell.find("main:is", NS)
        if inline is not None:
            parts = [text.text or "" for text in inline.iterfind(".//main:t", NS)]
            value = "".join(parts)
        return value.strip()


def load_template_context(xlsx_path: str | Path) -> TemplateContext:
    wb = WorkbookReader(xlsx_path)
    plantilla_rows = wb.rows("Plantilla")
    columns = [value for _, value in sorted(plantilla_rows[0].items()) if value]

    misc_catalogs: dict[str, dict[str, str]] = {}
    current_catalog = ""
    for row in wb.rows("CatálogosMisc")[1:]:
        if row.get("A"):
            current_catalog = row["A"].strip()
        if current_catalog and row.get("B"):
            meaning = row.get("C", "")
            misc_catalogs.setdefault(current_catalog, {})
            misc_catalogs[current_catalog][canonical(meaning)] = row["B"].strip()
            misc_catalogs[current_catalog][canonical(row["B"])] = row["B"].strip()

    country_codes: dict[str, str] = {}
    for row in wb.rows("CatálogoPaises")[1:]:
        code = row.get("B", "").strip()
        name = row.get("C", "").strip()
        if code and name:
            country_codes[canonical(name)] = code
            country_codes[canonical(code)] = code

    commune_codes: dict[str, str] = {}
    commune_postal_codes: dict[str, str] = {}
    for row in wb.rows("CatálogoComuna")[1:]:
        code = row.get("E", "").strip()
        name = row.get("F", "").strip()
        postal_code = row.get("G", "").strip()
        if code and name:
            commune_codes[canonical(name)] = code
            commune_codes[canonical(code)] = code
        if code and postal_code:
            commune_postal_codes[canonical(postal_code)] = code

    return TemplateContext(
        columns=columns,
        misc_catalogs=misc_catalogs,
        country_codes=country_codes,
        commune_codes=commune_codes,
        commune_postal_codes=commune_postal_codes,
    )


class RecordTransformer:
    def __init__(self, context: TemplateContext) -> None:
        self.context = context

    def transform_batch(self, oportunidad: str, records: list[dict[str, Any]]) -> dict[str, Any]:
        rows: list[dict[str, str]] = []
        errors: list[dict[str, Any]] = []

        for index, record in enumerate(records, start=1):
            row, row_errors = self.transform_record(oportunidad, record)
            rows.append(row)
            if row_errors:
                errors.append({"row": index, "documento": row.get("RecordName", ""), "errors": row_errors})

        return {
            "total_records": len(records),
            "valid_records": len(records) - len(errors),
            "error_records": len(errors),
            "columns": self.context.columns,
            "rows": rows,
            "errors": errors,
            "csv": rows_to_csv(self.context.columns, rows),
        }

    def transform_record(self, oportunidad: str, record: dict[str, Any]) -> tuple[dict[str, str], list[str]]:
        normalized = {canonical(key): value for key, value in record.items()}
        row = {column: "" for column in self.context.columns}
        row_errors: list[str] = []

        row["OportunidadSTEC_OptyNumber_c"] = str(oportunidad).strip()

        for column in self.context.columns:
            if column == "OportunidadSTEC_OptyNumber_c":
                continue
            source_key = SOURCE_ALIASES.get(column.lower())
            value = normalized.get(source_key, normalized.get(canonical(column), ""))
            row[column] = self._normalize_field(column, value, normalized)

        for column, fallback in DEFAULTS.items():
            if column in row and not row[column]:
                row[column] = fallback

        self._validate_required(row, row_errors)
        self._validate_catalogs(row, row_errors)
        return row, row_errors

    def _normalize_field(self, column: str, value: Any, source: dict[str, Any]) -> str:
        if column == "RecordName":
            return alnum_upper(value)
        if column in {"Nombres_c", "ApellidoPaterno_c", "ApellidoMaterno_c"}:
            return title_text(value)
        if column == "CorreoElectronico_c":
            return str(value or "").strip().lower()
        if column == "TelefonoMovil_c":
            return digits_only(value)
        if column == "FechaDeNacimiento_c":
            return normalize_date(value)
        if column == "Gender_c":
            mapped = self._lookup_misc("GENDER", value)
            return mapped or GENDER_CODES.get(canonical(value), str(value or "").strip())
        if column == "TipoDeIdentificacion_c":
            mapped = self._lookup_misc("TIPO_IDENTIFICACION_DEMRE", value)
            if mapped:
                return mapped
            return ID_TYPE_CODES.get(canonical(value), str(value or "").strip().upper())
        if column == "TipoDeCorreo_c":
            source_type = source.get("tipodecorreo", "")
            selected_value = source_type or value
            if not selected_value:
                return "PERSONAL"
            mapped = self._lookup_misc("CORREO", selected_value)
            return mapped or "PERSONAL"
        if column in {"PaisDeOrigen_c", "Pais_c"}:
            return self.context.country_codes.get(canonical(value), str(value or "").strip().upper())
        if column == "Comuna_c":
            lookup = canonical(value)
            if lookup in self.context.commune_codes:
                return self.context.commune_codes[lookup]
            if lookup in self.context.commune_postal_codes:
                return self.context.commune_postal_codes[lookup]
            return str(value or "").strip()
        if column == "Nacionalidad_c":
            mapped = self._lookup_misc("NACIONALIDAD", value)
            if mapped:
                return mapped
            inferred = NATIONALITY_CODES.get(canonical(value), "")
            if inferred:
                return inferred
            return str(value or "").strip() or DEFAULTS["Nacionalidad_c"]
        return str(value or "").strip()

    def _lookup_misc(self, catalog: str, value: Any) -> str:
        catalog_map = self.context.misc_catalogs.get(catalog, {})
        return catalog_map.get(canonical(value), "")

    def _validate_required(self, row: dict[str, str], row_errors: list[str]) -> None:
        required = [
            "OportunidadSTEC_OptyNumber_c",
            "RecordName",
            "Nombres_c",
            "ApellidoPaterno_c",
            "CorreoElectronico_c",
        ]
        for column in required:
            if not row.get(column):
                row_errors.append(f"Falta valor requerido en {column}")
        if row.get("CorreoElectronico_c") and "@" not in row["CorreoElectronico_c"]:
            row_errors.append("CorreoElectronico_c no parece válido")

    def _validate_catalogs(self, row: dict[str, str], row_errors: list[str]) -> None:
        if row.get("TipoDeIdentificacion_c") and row["TipoDeIdentificacion_c"] not in self.context.misc_catalogs.get("TIPO_IDENTIFICACION_DEMRE", {}).values():
            row_errors.append("TipoDeIdentificacion_c no coincide con catálogo")
        if row.get("TipoDeCorreo_c") and row["TipoDeCorreo_c"] not in self.context.misc_catalogs.get("CORREO", {}).values():
            row_errors.append("TipoDeCorreo_c no coincide con catálogo")
        if row.get("Gender_c") and row["Gender_c"] not in self.context.misc_catalogs.get("GENDER", {}).values():
            row_errors.append("Gender_c no coincide con catálogo")
        if row.get("PaisDeOrigen_c") and row["PaisDeOrigen_c"] not in self.context.country_codes.values():
            row_errors.append("PaisDeOrigen_c no coincide con catálogo")
        if row.get("Pais_c") and row["Pais_c"] not in self.context.country_codes.values():
            row_errors.append("Pais_c no coincide con catálogo")
        if row.get("Comuna_c") and row["Comuna_c"] not in self.context.commune_codes.values():
            row_errors.append("Comuna_c no coincide con catálogo")


def rows_to_csv(columns: list[str], rows: list[dict[str, str]]) -> str:
    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=columns)
    writer.writeheader()
    writer.writerows(rows)
    return output.getvalue()


def save_csv(columns: list[str], rows: list[dict[str, str]], destination: str | Path) -> None:
    with Path(destination).open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)


class WorkerHandler(BaseHTTPRequestHandler):
    transformer: RecordTransformer | None = None

    def do_POST(self) -> None:  # noqa: N802
        if self.path != "/transform":
            self._send(404, {"error": "Not found"})
            return

        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length)
        try:
            payload = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self._send(400, {"error": "Invalid JSON payload"})
            return

        oportunidad = str(payload.get("oportunidad", "")).strip()
        records = payload.get("records", [])
        if not oportunidad:
            self._send(400, {"error": "oportunidad is required"})
            return
        if not isinstance(records, list):
            self._send(400, {"error": "records must be a list"})
            return

        result = self.transformer.transform_batch(oportunidad, records)
        self._send(200, result)

    def do_GET(self) -> None:  # noqa: N802
        if self.path == "/health":
            self._send(200, {"status": "ok"})
            return
        self._send(404, {"error": "Not found"})

    def log_message(self, format: str, *args: Any) -> None:
        return

    def _send(self, status: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def run_server(host: str, port: int, transformer: RecordTransformer) -> None:
    WorkerHandler.transformer = transformer
    server = ThreadingHTTPServer((host, port), WorkerHandler)
    print(f"Listening on http://{host}:{port}")
    server.serve_forever()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="STEC CRM normalization worker")
    parser.add_argument("--template", default=DEFAULT_TEMPLATE, help="Path to the CRM template xlsx")
    parser.add_argument("--input", help="JSON file with oportunidad and records")
    parser.add_argument("--output", help="Destination CSV path")
    parser.add_argument("--serve", action="store_true", help="Run HTTP API server")
    parser.add_argument("--source-xlsx", help="Source workbook to transform directly")
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", default=8080, type=int)
    return parser.parse_args()


def read_source_workbook(source_xlsx: str | Path) -> dict[str, Any]:
    workbook = WorkbookReader(source_xlsx)
    sheet_name = next(iter(workbook.sheet_targets))
    rows = workbook.rows(sheet_name)
    if not rows:
        return {"oportunidad": "", "records": []}

    header_row = rows[0]
    records: list[dict[str, str]] = []
    oportunidad = ""

    for row in rows[1:]:
        record: dict[str, str] = {}
        for col_ref, header in sorted(header_row.items()):
            if header and header not in record:
                record[header] = row.get(col_ref, "").strip()
        if any(str(value).strip() for value in record.values()):
            records.append(record)
            if not oportunidad:
                oportunidad = record.get("OportunidadSTEC_OptyNumber_c", "").strip()

    return {"oportunidad": oportunidad, "records": records}


def main() -> None:
    args = parse_args()
    context = load_template_context(args.template)
    transformer = RecordTransformer(context)

    if args.serve:
        run_server(args.host, args.port, transformer)
        return

    if args.source_xlsx:
        payload = read_source_workbook(args.source_xlsx)
    else:
        if not args.input:
            raise SystemExit("--input is required when not using --serve")
        with Path(args.input).open("r", encoding="utf-8") as handle:
            payload = json.load(handle)

    result = transformer.transform_batch(str(payload.get("oportunidad", "")), payload.get("records", []))
    if args.output:
        save_csv(result["columns"], result["rows"], args.output)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
