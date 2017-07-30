PATHS = require('../PATHS')
runScriptSync = require('../util/runScriptSync')
path = require('path')
fs = require('fs-extra')


console.log('CREATING MINIFIED CLIENT BUNDLE')
runScriptSync(path.resolve(__dirname, '../bundleClient'))

console.log('CLEARING PREVIOUS PHP SERVER VERSION')
fs.emptyDirSync(PATHS.PHP_SERVER_COMPILE_OUT)

console.log('MERGING FOLDERS')
console.log('\t-phpServer source')
fs.copySync(PATHS.PHP_SERVER_SOURCE, PATHS.PHP_SERVER_COMPILE_OUT)
fs.removeSync(path.resolve(PATHS.PHP_SERVER_COMPILE_OUT, './.idea'))
console.log('\t-minified client')
fs.copySync(PATHS.CLIENT_COMPILE_OUT, PATHS.PHP_SERVER_COMPILE_OUT)
console.log('\t-test data')
fs.copySync(
	PATHS.TEST_DATA,
	path.resolve(PATHS.PHP_SERVER_COMPILE_OUT, './.data/testData'),
	{
		filter: (src) ->
			return src != path.resolve(PATHS.TEST_DATA, './img')
	}
)
console.log('\t-question images')
fs.copySync(
	path.resolve(PATHS.TEST_DATA, './img')
	path.resolve(PATHS.PHP_SERVER_COMPILE_OUT, './questionImg')
)

console.log('SUCCESSFULLY COMPILED PHP SERVER')
console.log('')