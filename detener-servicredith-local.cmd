@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\detener-servicredith-local.ps1"
if errorlevel 1 (
  echo.
  echo No se pudo detener ServiCredith local.
  pause
)
