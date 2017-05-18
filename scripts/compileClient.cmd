@echo off
setlocal
cd %~dp0
cd ../client/res

if not exist .\js\NUL (
    mkdir .\js
)
call browserify -t coffeeify --debug --extension=".coffee" ./coffee/index.coffee > ./js/bundle.js

endlocal