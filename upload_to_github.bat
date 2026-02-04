@echo off
echo ========================================
echo   MCREW Bot - Upload to GitHub
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git is installed. Proceeding...
echo.

REM Initialize git repository
echo Initializing Git repository...
git init

REM Add all files
echo Adding all files...
git add .

REM Check if there are changes to commit
git diff --cached --quiet
if errorlevel 1 (
    echo Committing changes...
    git commit -m "MCREW Design Bot - Ready for deployment"
) else (
    echo No changes to commit.
)

REM Set main branch
echo Setting main branch...
git branch -M main

echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo 1. Create repository on GitHub:
echo    - Go to https://github.com
echo    - Click "New" repository
echo    - Name: mcrew-design-bot
echo    - Make it Public
echo    - Click "Create repository"
echo.
echo 2. Copy your repository URL and run:
echo    git remote add origin https://github.com/YOUR_USERNAME/mcrew-design-bot.git
echo    git push -u origin main
echo.
echo 3. Or use this template (replace YOUR_USERNAME):
echo    git remote add origin https://github.com/YOUR_USERNAME/mcrew-design-bot.git
echo    git push -u origin main
echo.
echo Repository is ready for upload!
echo ========================================
pause