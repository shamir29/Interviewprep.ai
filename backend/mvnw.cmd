@REM ----------------------------------------------------------------------------
@REM Maven Startup Batch script for InterviewPrep AI
@REM ----------------------------------------------------------------------------

@ECHO OFF
@SETLOCAL

SET ERROR_CODE=0

IF EXIST "%~dp0apache-maven-3.9.6\bin\mvn.cmd" (
    "%~dp0apache-maven-3.9.6\bin\mvn.cmd" %*
    EXIT /B %ERRORLEVEL%
)

mvn %*
EXIT /B %ERRORLEVEL%
