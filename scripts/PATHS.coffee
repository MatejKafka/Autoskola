path = require('path')


ROOT = path.resolve(__dirname, '..')
COMPILE_OUT = path.resolve(ROOT, './out')

module.exports =
	ROOT: ROOT
	TEST_DATA: path.resolve(ROOT, './data/testData')
	CLIENT: path.resolve(ROOT, './client')
	COMPILE_OUT: COMPILE_OUT
	CLIENT_COMPILE_OUT: path.resolve(COMPILE_OUT, './client')
	PHP_SERVER_COMPILE_OUT: path.resolve(COMPILE_OUT, './phpServer')
	PHP_SERVER_SOURCE: path.resolve(ROOT, './phpServer')