path = require('path')
installNestedModules = require('./installNestedModules')


installNestedModules(path.resolve(__dirname, '../'))
console.log('INSTALLED ALL INTERNAL MODULES')


runScriptSync = require('./util/runScriptSync')

runScriptSync(path.resolve(__dirname, './compileCoffee'))
console.log('COMPILED .COFFEE SCRIPTS')
runScriptSync(path.resolve(__dirname, './compileLess'))
console.log('COMPILED .LESS STYLESHEETS')