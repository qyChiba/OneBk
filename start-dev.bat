@echo off
echo 正在以管理员权限启动开发服务器...
cd /d "%~dp0"
powershell -Command "Start-Process cmd -ArgumentList '/c npm run dev' -Verb RunAs"

