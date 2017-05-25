@echo off
setlocal
cd %~dp0

if not exist ..\client\res\js\NUL (
    mkdir ..\client\res\js
)

call "./node_modules/.bin/browserify.cmd" ^
    -t coffeeify --debug --extension=".coffee" ^
     "../client/res/coffee/index.coffee" > "../client/res/js/bundle.js"

endlocal