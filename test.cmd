@echo off

REM バックエンド（Flask）を起動
start cmd /k "cd /d %~dp0projects\backend && python app.py"

REM フロントエンド（React）を起動
start cmd /k "cd /d %~dp0projects\frontend && npm start"
REM VSCodeを起動
code .
exit