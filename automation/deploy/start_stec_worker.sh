#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

HOST="${STEC_WORKER_HOST:-0.0.0.0}"
PORT="${STEC_WORKER_PORT:-8080}"
TEMPLATE_PATH="${STEC_TEMPLATE_PATH:-$PROJECT_DIR/data/Nomina inscritos CRM.xlsx}"
PYTHON_BIN="${PYTHON_BIN:-/usr/bin/python3}"

exec "$PYTHON_BIN" "$PROJECT_DIR/automation/stec_crm_worker.py" \
  --template "$TEMPLATE_PATH" \
  --serve \
  --host "$HOST" \
  --port "$PORT"
