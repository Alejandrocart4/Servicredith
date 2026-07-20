@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\servicredith-local.ps1"
if errorlevel 1 (
  echo.
  echo No se pudo iniciar ServiCredith local.
  pause
)
