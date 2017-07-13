path = require('path')
installNestedModules = require('./installNestedModules')


installNestedModules(path.resolve(__dirname, '../'))

require('./webpack/compileCoffee')