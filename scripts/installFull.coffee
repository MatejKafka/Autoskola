path = require('path')
fs = require('fs')
installNestedModules = require('./installNestedModules')
runScriptSync = require('./util/runScriptSync')


installNestedModules(path.resolve(__dirname, '../'))
console.log('INSTALLED ALL INTERNAL MODULES')

console.log('COMPILING CLIENT')
if (fs.existsSync(path.resolve(__dirname, '../client/res/coffee')))
  runScriptSync(path.resolve(__dirname, './compileCoffee'))
  console.log('COMPILED .COFFEE SCRIPTS')
if (fs.existsSync(path.resolve(__dirname, '../client/res/less')))
  runScriptSync(path.resolve(__dirname, './compileLess'))
  console.log('COMPILED .LESS STYLESHEETS')