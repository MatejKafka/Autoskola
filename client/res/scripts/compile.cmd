@echo off
setlocal
cd %~dp0

browserify -t coffeeify --debug ../coffee/index.coffee > ../js/bundle.js

endlocal