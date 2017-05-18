::@echo off
setlocal
cd %~dp0
cd ../client/res

browserify -t coffeeify --debug --extension=".coffee" ./coffee/index.coffee > ./js/bundle.js

endlocal