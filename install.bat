@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
npm install --legacy-peer-deps --no-progress --loglevel=error --prefer-offline > "%~dp0install-log.txt" 2>&1
echo EXIT:%ERRORLEVEL% >> "%~dp0install-log.txt"
