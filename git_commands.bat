@echo off
echo Committing changes to GitHub...
git add miniapp/*
git commit -m "Update Mini App: new minimalist design with light/dark theme and full contact info"
git push
echo Done!
pause
