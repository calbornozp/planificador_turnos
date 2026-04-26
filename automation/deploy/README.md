# Deploy simple en DigitalOcean

Esta es la opción más simple: un `systemd service` levantando el worker HTTP, opcionalmente detrás de `nginx`.

## Estructura recomendada en el droplet

```text
/opt/stec-crm-worker/
  automation/
  data/
    Nomina inscritos CRM.xlsx
```

## 1. Copiar archivos al servidor

Sube este proyecto a tu droplet, por ejemplo a:

```bash
/opt/stec-crm-worker
```

Y copia también la plantilla CRM a:

```bash
/opt/stec-crm-worker/data/Nomina inscritos CRM.xlsx
```

## 2. Crear usuario de servicio

```bash
sudo adduser --system --group deploy
sudo chown -R deploy:deploy /opt/stec-crm-worker
sudo chmod +x /opt/stec-crm-worker/automation/deploy/start_stec_worker.sh
```

## 3. Instalar el servicio

```bash
sudo cp /opt/stec-crm-worker/automation/deploy/stec-crm-worker.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable stec-crm-worker
sudo systemctl start stec-crm-worker
```

## 4. Verificar

```bash
sudo systemctl status stec-crm-worker
curl http://127.0.0.1:8080/health
```

Deberías recibir:

```json
{"status": "ok"}
```

## 5. Exponerlo con nginx

Si ya usas `nginx` en el droplet:

```bash
sudo cp /opt/stec-crm-worker/automation/deploy/nginx-stec-worker.conf /etc/nginx/sites-available/stec-crm-worker
sudo ln -s /etc/nginx/sites-available/stec-crm-worker /etc/nginx/sites-enabled/stec-crm-worker
sudo nginx -t
sudo systemctl reload nginx
```

Entonces `n8n` podrá llamar:

- `GET http://TU_IP/health`
- `POST http://TU_IP/transform`

## 6. Payload que debe mandar n8n

```json
{
  "oportunidad": "497438",
  "records": [
    {
      "RecordName": "17534525-6",
      "TipoDeIdentificacion_c": "C",
      "Nombres_c": "Aline Luciana",
      "ApellidoPaterno_c": "Cohen",
      "ApellidoMaterno_c": "Helle",
      "CorreoElectronico_c": "ps.alinecohen@gmail.com",
      "TipoDeCorreo": "PERSONAL",
      "TelefonoMovil_c": "56953524120",
      "PaisDeOrigen_c": "CL",
      "FechaDeNacimiento_c": "32521",
      "EstadoCivil_c": "soltera",
      "Nacionalidad_c": "Chilena",
      "Pais_c": "CL",
      "Direccion_c": "Av. 18 de Septiembre #1191, Arica",
      "Comuna_c": "1000000"
    }
  ]
}
```

## 7. Flujo mínimo en n8n

1. Leer el Excel origen.
2. Convertir cada fila a JSON.
3. Agrupar filas en un arreglo `records`.
4. Hacer `POST` al worker.
5. Guardar la respuesta `csv` o `rows`.

## Notas

- No necesitas instalar librerías Python extra.
- Si cambias de puerto o ruta de plantilla, ajusta las variables del `.service`.
- Si prefieres HTTPS, lo más simple es poner `nginx` con Let's Encrypt delante del worker.
