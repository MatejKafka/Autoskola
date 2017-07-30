PATHS = require('../PATHS')
fs = require('fs-extra')
path = require('path')
runScriptSync = require('../util/runScriptSync')


paths = [
	'./index.html'
	'./res/fonts'
	'./res/img'
	'./res/js'
	'./res/css'
]

console.log('BUILDING .coffee SCRIPTS...')
runScriptSync(path.resolve(__dirname, '../compileCoffee'))
console.log('BUILDING .less STYLESHEETS...')
runScriptSync(path.resolve(__dirname, '../compileLess'))

for filePath in paths
	fs.copySync(
		path.resolve(PATHS.CLIENT, filePath)
		path.resolve(PATHS.CLIENT_COMPILE_OUT, filePath)
	)

console.log("EXTRACTED REQUIRED CLIENT FILES TO `#{PATHS.CLIENT_COMPILE_OUT}`")