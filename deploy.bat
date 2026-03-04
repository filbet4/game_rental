@echo off
REM Game Rental System - Deploy to Pascal Server (Windows)
REM Usage: deploy.bat YOUR_USERNAME

setlocal enabledelayedexpansion

if "%1"=="" (
    echo Usage: deploy.bat YOUR_USERNAME
    echo.
    echo This script will upload the project to pascal.fis.agh.edu.pl
    echo.
    pause
    exit /b 1
)

set PASCAL_USER=%1
set PASCAL_HOST=pascal.fis.agh.edu.pl
set REMOTE_PORT=5207

echo.
echo 🎮 Game Rental System - Pascal Deployment
echo ============================================
echo.

REM Check if scp is available
where scp >nul 2>nul
if errorlevel 1 (
    echo ❌ OpenSSH not found. Please install:
    echo    - Git Bash (includes ssh/scp)
    echo    - Or Windows Subsystem for Linux (WSL)
    echo    - Or PuTTY with plink
    pause
    exit /b 1
)

echo 📤 Uploading backend to %PASCAL_HOST%...
scp -r backend %PASCAL_USER%@%PASCAL_HOST%:/home/%PASCAL_USER%/game_rental_backend

echo 📤 Uploading frontend to %PASCAL_HOST%...
scp -r frontend %PASCAL_USER%@%PASCAL_HOST%:/home/%PASCAL_USER%/game_rental_frontend

echo.
echo ✅ Upload complete!
echo.
echo 🔧 SSH into server and run:
echo    ssh %PASCAL_USER%@%PASCAL_HOST%
echo.
echo Then in the server:
echo    cd game_rental_backend
echo    python3 -m venv venv
echo    source venv/bin/activate
echo    pip install -r requirements.txt
echo.
echo Update .env with:
echo    PORT=5207
echo    CORS_ORIGIN=http://pascal.fis.agh.edu.pl:5207
echo.
echo Start with: python run.py
echo.
pause
