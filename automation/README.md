# STEC CRM worker

Base mínima para automatizar la carga de inscritos hacia la plantilla CRM de STEC usando `n8n` como orquestador y un worker Python en `DigitalOcean`.

## Qué hace

- Lee la estructura del Excel plantilla y sus catálogos directamente desde el `.xlsx`
- Normaliza registros de entrada al formato esperado por la hoja `Plantilla`
- Valida campos críticos como identificación, género, país y comuna
- Devuelve JSON y también genera CSV UTF-8 listo para una importación CRM

## Archivos

- [stec_crm_worker.py](/Users/carlosalbornoz/propuesta/automation/stec_crm_worker.py)
- [sample_payload.json](/Users/carlosalbornoz/propuesta/automation/sample_payload.json)
- [n8n-flow-template.json](/Users/carlosalbornoz/propuesta/automation/n8n-flow-template.json)
- [deploy/README.md](/Users/carlosalbornoz/propuesta/automation/deploy/README.md)
- [deploy/start_stec_worker.sh](/Users/carlosalbornoz/propuesta/automation/deploy/start_stec_worker.sh)
- [deploy/stec-crm-worker.service](/Users/carlosalbornoz/propuesta/automation/deploy/stec-crm-worker.service)

## Ejecutarlo local

```bash
python3 automation/stec_crm_worker.py \
  --template "/Users/carlosalbornoz/Desktop/TDR Cooperativas/Forms STEC/Nomina inscritos CRM.xlsx" \
  --input automation/sample_payload.json \
  --output automation/output.csv
```

## Procesar un Excel fuente directo

```bash
python3 automation/stec_crm_worker.py \
  --template "/Users/carlosalbornoz/Desktop/TDR Cooperativas/Forms STEC/Nomina inscritos CRM.xlsx" \
  --source-xlsx "/Users/carlosalbornoz/Desktop/STEC/VVcM/lista matricula CRM psicólogos proyecto de vida.xlsx" \
  --output automation/psicologos_proyecto_vida.csv
```

Esto sirve cuando el Excel origen ya trae una tabla con encabezados. El worker:

- toma la primera hoja,
- usa la primera fila como headers,
- conserva la primera aparición si un encabezado viene duplicado,
- convierte fechas seriales de Excel a `YYYY-MM-DD`,
- y traduce códigos postales/comunales al código de comuna que espera el CRM.

## Levantar API para n8n

```bash
python3 automation/stec_crm_worker.py \
  --template "/Users/carlosalbornoz/Desktop/TDR Cooperativas/Forms STEC/Nomina inscritos CRM.xlsx" \
  --serve \
  --host 0.0.0.0 \
  --port 8080
```

Endpoints:

- `GET /health`
- `POST /transform`

## Despliegue simple en DigitalOcean

La opción más directa es levantarlo con `systemd` y exponerlo por `nginx`.

Guía lista para usar:

- [deploy/README.md](/Users/carlosalbornoz/propuesta/automation/deploy/README.md)

Archivos de apoyo:

- [deploy/start_stec_worker.sh](/Users/carlosalbornoz/propuesta/automation/deploy/start_stec_worker.sh)
- [deploy/stec-crm-worker.service](/Users/carlosalbornoz/propuesta/automation/deploy/stec-crm-worker.service)
- [deploy/nginx-stec-worker.conf](/Users/carlosalbornoz/propuesta/automation/deploy/nginx-stec-worker.conf)

Payload esperado:

```json
{
  "oportunidad": "316356",
  "records": [
    {
      "documento": "212460826",
      "tipo_identificacion": "RUT",
      "nombres": "Ana Maria",
      "apellido_paterno": "Perez",
      "apellido_materno": "Gonzalez",
      "email": "ana@correo.cl",
      "telefono": "+56987654321",
      "pais_origen": "Chile",
      "genero": "Mujer",
      "fecha_nacimiento": "14/05/1998",
      "direccion": "Calle Falsa 123",
      "comuna": "Santiago"
    }
  ]
}
```

## Diseño recomendado con n8n

1. `Webhook` o disparador desde tu fuente.
2. `Split In Batches` para dividir inscritos en grupos de 25 a 100.
3. `HTTP Request` al worker en DigitalOcean.
4. Nodo de agregación para juntar todas las filas.
5. Nodo final para guardar `output.csv`, enviarlo por correo o subirlo a un bucket.

## Cómo se ve el “enjambre”

No conviene que muchos agentes escriban el mismo Excel a la vez. Lo robusto es:

- `n8n` divide lotes.
- varios workers procesan en paralelo.
- un paso final unifica resultados.
- una sola salida genera el CSV o el archivo final de importación.

## Siguientes pasos útiles

- Conectar tu fuente real de inscritos.
- Afinar reglas de mapeo para tus nombres reales de campos.
- Agregar exportación `.xlsx` si quieres mantener formato idéntico a la plantilla.
- Incorporar un modelo LLM solo para casos ambiguos, no para todos los registros.
