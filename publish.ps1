# Script de publicación para Sidón Landing (IIS Reverse Proxy)

Write-Host "Iniciando proceso de publicación..." -ForegroundColor Cyan

# 1. Generar el Build de Next.js
Write-Host "Generando build..." -ForegroundColor Yellow
npm run build

# 2. Preparar carpeta limpia
if (Test-Path publish) { 
    Write-Host "Limpiando carpeta publish anterior..." -ForegroundColor Gray
    Remove-Item -Recurse -Force publish 
}
New-Item -ItemType Directory -Path publish

# 3. Copiar el servidor Standalone
Write-Host "Copiando archivos del servidor..." -ForegroundColor Gray
Copy-Item -Recurse .next/standalone/* publish

# 4. Copiar assets estáticos (Imprescindible para que se vea bien)
Write-Host "Copiando assets estáticos (imágenes y estilos)..." -ForegroundColor Gray
Copy-Item -Recurse public publish/
if (!(Test-Path publish/.next/static)) { New-Item -ItemType Directory -Path publish/.next/static }
Copy-Item -Recurse .next/static/* publish/.next/static/

# 5. Detectar versión y comprimir en carpeta 'published'
Write-Host "`nPreparando compresión..." -ForegroundColor Yellow

$publishFolder = "published"
if (!(Test-Path $publishFolder)) { New-Item -ItemType Directory -Path $publishFolder }

# Intentar encontrar la versión más alta actual dentro de 'published'
$version = 9
$zips = Get-ChildItem -Path $publishFolder -Filter "landing v*.zip"
if ($zips) {
    $highest = $zips | ForEach-Object { 
        if ($_.BaseName -match "v(\d+)") { [int]$matches[1] } 
    } | Sort-Object -Descending | Select-Object -First 1
    if ($highest) { $version = $highest + 1 }
}

$zipName = "landing v$version.zip"
$zipPath = Join-Path $publishFolder $zipName

if (Test-Path $zipPath) { Remove-Item $zipPath }

Write-Host "Comprimiendo contenido en $zipPath..." -ForegroundColor Gray
Compress-Archive -Path publish/* -DestinationPath $zipPath

Write-Host "`n¡Éxito! Todo el contenido necesario está en la carpeta 'publish' y comprimido en '$zipPath'." -ForegroundColor Green
Write-Host "Ahora solo toma el archivo de la carpeta '$publishFolder' y súbelo al servidor." -ForegroundColor White
