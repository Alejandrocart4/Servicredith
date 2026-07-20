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

    throw 'No se encontro Docker Compose.'
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
    throw 'No se encontro Docker.'
}

Test-DockerCompose

Push-Location $Root
try {
    Write-Host 'Deteniendo ServiCredith local...' -ForegroundColor Cyan
    Invoke-Compose @('-f', $ComposeFile, 'down')
    Write-Host 'ServiCredith local detenido.' -ForegroundColor Green
}
finally {
    Pop-Location
}
