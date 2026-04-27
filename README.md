# Planificador de Turnos

Aplicacion web cliente para planificar turnos laborales, transporte en taxi y dotacion de trabajadores.

## Incluye

- Pestañas por turno: Administrativo, Dia, Tarde y Noche.
- Calculo automatico de horas efectivas y horarios de taxi.
- Gestion de trabajadores con padron general.
- Etiquetas por trabajador: turno, area, taxi, almuerzo y vacaciones.
- Exportacion e importacion de planificacion en JSON.
- Descarga de PDF por turno y consolidado.

## Desarrollo local

Requisitos:

- Node.js 18.x
- npm 9+

Instalacion y arranque:

```bash
npm install
npm start
```

La app abre en `http://localhost:3000`.

## Build

```bash
npm run build
```

El resultado se genera en `build/`.

## Deploy estatico

Para DigitalOcean App Platform:

- Build command: `npm run build`
- Output directory: `build`
- Catch-all document: `index.html`
