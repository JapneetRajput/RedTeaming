@echo off

if [%1]==[] goto usage
SET conf=%1
goto :run
:usage
SET conf=0.0.0.0:8000
:run
set venv=.\venv\Scripts\activate
set server=.\venv\Scripts\waitress-serve.exe
if exist %server% (
  echo Running APP on %conf%
  %venv%
  %server% --listen=%conf% --threads=10 --channel-timeout=5600 APTRS.wsgi:application
) else (
  echo Unable to Start the server.
  pause
  exit /b
)