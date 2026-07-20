$ErrorActionPreference = 'Stop'

$Root = Resolve-Path (Join-Path $PSScriptRoot '..')
$ComposeFile = Join-Path $Root 'docker-compose-prod.yml'
$UseLegacyCompose = $false

function Test-DockerCompose {
    docker compose version *> $null
    if ($LASTEXITCODE -eq 0) {
        return
    }

    docker-compose version *> $null
    if ($LASTEXITCODE -eq 0) {
        $script:UseLegacyCompose = $true
        return
    }

    throw 'No se encontro Docker Compose. Instala Docker Desktop y vuelve a intentar.'
}

function Invoke-Compose {
    param([string[]]$Arguments)

    if ($script:UseLegacyCompose) {
        & docker-compose @Arguments
    } else {
        & docker compose @Arguments
    }

    if ($LASTEXITCODE -ne 0) {
        throw "Docker Compose fallo con codigo $LASTEXITCODE."
    }
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw 'No se encontro Docker. Instala Docker Desktop y abrelo antes de iniciar ServiCredith.'
}

Test-DockerCompose

Push-Location $Root
try {
    Write-Host 'Iniciando ServiCredith local con Docker...' -ForegroundColor Cyan
    Invoke-Compose @('-f', $ComposeFile, 'up', '--build', '-d')

    Write-Host ''
    Write-Host 'ServiCredith esta iniciando:' -ForegroundColor Green
    Write-Host '  App:     http://localhost:4173'
    Write-Host '  API:     http://localhost:3000'
    Write-Host '  Swagger: http://localhost:3000/api-docs'
    Write-Host ''
    Write-Host 'Puedes instalar la app desde el navegador cuando aparezca el icono de instalacion.' -ForegroundColor Yellow
    Write-Host 'Para apagar todo, ejecuta detener-servicredith-local.cmd.' -ForegroundColor Yellow
    Write-Host ''

    Start-Sleep -Seconds 2
    Start-Process 'http://localhost:4173'

    Write-Host 'Mostrando logs. Cierra esta ventana si solo quieres dejar los contenedores corriendo.' -ForegroundColor DarkGray
    Invoke-Compose @('-f', $ComposeFile, 'logs', '-f', 'credith_service', 'credith_website')
}
finally {
    Pop-Location
}
