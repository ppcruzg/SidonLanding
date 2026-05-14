# Guía de Despliegue - Sidón Landing

Esta guía detalla el proceso para publicar actualizaciones en el servidor IIS de producción.

## Requisitos Previos
*   **Servidor**: Windows Server con IIS.
*   **IIS**: Configurado con el módulo de **URL Rewrite** para actuar como Reverse Proxy.
*   **Node.js**: Instalado en el servidor (preferiblemente la misma versión que en desarrollo).
*   **Task Scheduler**: Tarea programada configurada para ejecutar `node server.js` en el puerto 3000.

## Proceso de Publicación

### Paso 1: Generar el paquete (Local)
Para evitar errores de carpetas faltantes (como imágenes o estilos), utiliza el script de automatización:

1. Abre PowerShell en la raíz del proyecto.
2. Ejecuta:
   ```powershell
   ./publish.ps1
   ```
3. Esto generará una carpeta llamada `publish`. Comprime el **contenido** de esta carpeta en un archivo `.zip`.

### Paso 2: Preparar el Servidor
Antes de copiar los archivos, es necesario detener el proceso actual para liberar los archivos bloqueados:

1. Abre PowerShell como Administrador en el servidor.
2. Detén el proceso de Node:
   ```powershell
   taskkill /F /IM node.exe
   ```

### Paso 3: Actualizar Archivos
1. **Backup**: Haz una copia de seguridad de la carpeta actual `C:\inetpub\wwwroot\Landing`.
2. **Limpiar**: Borra el contenido de `C:\inetpub\wwwroot\Landing` (excepto el archivo `web.config`).
3. **Desplegar**: Extrae el contenido del `.zip` generado en el Paso 1 dentro de `C:\inetpub\wwwroot\Landing`.

> [!IMPORTANT]
> **Verificación del web.config**: Asegúrate de que el archivo `web.config` en el servidor contenga la regla de Reverse Proxy hacia `http://127.0.0.1:3000/Landing/`. **No lo sobrescribas** con archivos vacíos.

### Paso 4: Iniciar el Servicio
1. Abre el **Programador de Tareas** (Task Scheduler).
2. Busca la tarea de Sidón y ejecútala manualmente.
3. Verifica que el sitio esté arriba en: [https://www.sidon.mx/landing/](https://www.sidon.mx/landing/)

---

## Estructura de Archivos Correcta
Para que el sitio funcione y se vea correctamente, la carpeta en el servidor DEBE verse así:
```text
C:\inetpub\wwwroot\Landing\
├── server.js          (Servidor principal)
├── web.config         (Configuración de IIS)
├── package.json       (Metadatos)
├── .next/
│   └── static/        (Estilos y JS del cliente)
├── public/            (Imágenes y PDFs)
└── node_modules/      (Dependencias de producción)
```

## Solución de Problemas
*   **Error 502/503**: El proceso de Node no ha iniciado o no está en el puerto 3000. Revisa la Tarea Programada.
*   **Imágenes rotas o sin estilos**: Falta la carpeta `public` o `.next/static`. Asegúrate de haber usado el script `publish.ps1`.
*   **Error en Formulario**: Verifica que el archivo `.env.local` con las credenciales de reCAPTCHA y correo esté presente en la raíz si es necesario (o configurado en las variables de entorno del sistema).
