@echo off
title Mazhar's Finances - Freelancer Finance App
cd /d "%~dp0"

echo ==========================================================
echo Starting Mazhar's Finances - Freelancer Finance Suite
echo ==========================================================

REM Launch in browser
start "" "%~dp0index.html"

echo.
echo Mazhar's Finances opened in your browser!
echo If you prefer running a local server on port 8080, run:
echo powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
echo.
pause
