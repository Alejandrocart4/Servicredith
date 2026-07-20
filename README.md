# Servicredith

## Arranque local sin comandos manuales

Para correr el proyecto en otra PC de forma local, instala y abre Docker Desktop. Luego haz doble clic en:

- `iniciar-servicredith-local.cmd`: construye y levanta Postgres, API y Website.
- `detener-servicredith-local.cmd`: apaga los contenedores locales.

Cuando termine de iniciar, abre automaticamente:

- App: http://localhost:4173
- API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

El backend ejecuta migraciones y carga datos demo solo si la base esta vacia. En siguientes arranques reutiliza la misma base sin duplicar seeders.

## Cuentas demo

Todas usan la contrasena `123456`.

- Owner: `carlos.martinez@credith.hn`
- Admin: `maria.garcia@credith.hn`
- Employee: `jose.hernandez@credith.hn`

## PWA

El Website incluye manifest y service worker. Al correr con `iniciar-servicredith-local.cmd`, el navegador puede mostrar la opcion de instalar ServiCredith como aplicacion local.
