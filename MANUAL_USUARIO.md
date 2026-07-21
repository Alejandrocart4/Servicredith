# Manual de usuario de ServiCredith local

Este manual explica como instalar Docker, iniciar ServiCredith en una PC local y dejar un acceso directo de la web como aplicacion.

## 1. Requisitos

- Una PC con Windows 10 o Windows 11.
- Conexion a internet para la primera instalacion y la primera descarga de contenedores.
- Docker Desktop instalado y abierto.
- La carpeta completa del proyecto `Servicredith`.

Importante: no basta con copiar solo la PWA o la carpeta `Website`. Para trabajar localmente se necesita el proyecto completo porque Docker levanta la base de datos, el backend y la web.

## 2. Instalar Docker Desktop en Windows

1. Entra a la pagina oficial de Docker para Windows:
   https://docs.docker.com/desktop/setup/install/windows-install/
2. Descarga Docker Desktop para Windows.
3. Ejecuta `Docker Desktop Installer.exe`.
4. Usa la instalacion recomendada por usuario cuando el instalador la ofrezca.
5. Cuando el instalador pregunte por WSL 2, deja marcada la opcion de usar WSL 2.
6. Termina la instalacion y reinicia la PC si Windows o Docker lo solicitan.
7. Abre Docker Desktop desde el menu Inicio.
8. Acepta los terminos de Docker Desktop.
9. Espera hasta que Docker indique que esta listo.

Si Docker pide habilitar WSL 2 o actualizarlo, segui las instrucciones del instalador. Docker recomienda usar WSL 2 en Windows porque permite ejecutar contenedores Linux desde una terminal de Windows.

## 3. Preparar la carpeta del proyecto

1. Copia la carpeta completa `Servicredith` a la PC donde se va a usar.
2. Dejala en una ubicacion facil de encontrar, por ejemplo:
   `C:\Servicredith`
3. Entra a esa carpeta y verifica que existan estos archivos:
   `iniciar-servicredith-local.cmd`
   `detener-servicredith-local.cmd`
   `docker-compose-prod.yml`

## 4. Iniciar ServiCredith

1. Asegurate de que Docker Desktop este abierto.
2. Haz doble clic en `iniciar-servicredith-local.cmd`.
3. Espera mientras Docker construye e inicia los servicios.
4. La primera vez puede tardar varios minutos.
5. Cuando termine, se abrira automaticamente la web:
   http://localhost:4173

Tambien quedan disponibles:

- API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

Si la ventana de consola queda mostrando logs, podes dejarla abierta o cerrarla. Los contenedores quedan corriendo en Docker.

## 5. Crear el acceso directo de ServiCredith

Despues de abrir http://localhost:4173 en Microsoft Edge o Google Chrome:

1. Espera a que cargue la pagina de ServiCredith.
2. Busca el icono de instalacion en la barra de direcciones del navegador.
3. Selecciona `Instalar` cuando el navegador lo pregunte.
4. Acepta crear acceso directo si aparece esa opcion.
5. Al terminar, ServiCredith se abrira como una aplicacion independiente.
6. Desde esa ventana podes anclarla a la barra de tareas o al menu Inicio.

Si no aparece el icono de instalacion:

1. Abre el menu de tres puntos del navegador.
2. Busca la opcion `Aplicaciones` o `Instalar esta pagina como aplicacion`.
3. Confirma la instalacion.

Importante: el acceso directo abre la web local, pero antes de usarlo siempre debe estar corriendo Docker y ServiCredith debe haberse iniciado con `iniciar-servicredith-local.cmd`.

## 6. Iniciar en el uso diario

Cada vez que se quiera usar ServiCredith:

1. Abre Docker Desktop.
2. Haz doble clic en `iniciar-servicredith-local.cmd`.
3. Abre el acceso directo de ServiCredith o entra a http://localhost:4173.

## 7. Apagar ServiCredith

Cuando ya no se vaya a usar:

1. Cierra la ventana de ServiCredith.
2. Haz doble clic en `detener-servicredith-local.cmd`.
3. Espera el mensaje de confirmacion.

Esto apaga la web, el backend y la base de datos local.

## 8. Datos y cuentas iniciales

El backend ejecuta migraciones y carga datos demo solo si la base esta vacia. Despues reutiliza la misma base local para no duplicar informacion.

Cuentas demo:

- Propietario: `carlos.martinez@credith.hn`
- Administrador: `maria.garcia@credith.hn`
- Empleado: `jose.hernandez@credith.hn`
- Contrasena: `123456`

## 9. Problemas comunes

Si `iniciar-servicredith-local.cmd` dice que no encuentra Docker:

- Abri Docker Desktop.
- Espera a que termine de iniciar.
- Vuelve a ejecutar `iniciar-servicredith-local.cmd`.

Si la pagina no abre:

- Verifica que Docker Desktop este corriendo.
- Entra manualmente a http://localhost:4173.
- Si aun no carga, espera unos minutos porque la primera construccion puede tardar.

Si aparece error de puerto ocupado:

- Cierra otros programas que usen los puertos `3000`, `4173` o `5432`.
- Ejecuta `detener-servicredith-local.cmd`.
- Vuelve a ejecutar `iniciar-servicredith-local.cmd`.

Si queres borrar todos los datos locales:

1. Ejecuta `detener-servicredith-local.cmd`.
2. Abre Docker Desktop.
3. Elimina el contenedor `Servicredith_db`.
4. Vuelve a ejecutar `iniciar-servicredith-local.cmd`.

## 10. Fuentes oficiales

- Instalacion de Docker Desktop en Windows: https://docs.docker.com/desktop/setup/install/windows-install/
- Docker Desktop con WSL 2 en Windows: https://docs.docker.com/desktop/features/wsl/
