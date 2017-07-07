path = require('path')
runTests = require('./test.js')

DIR = __dirname

runTests(
	path.resolve(DIR, './tests')
	path.resolve(DIR, '..')
	path.resolve(DIR, './history.json')
)
.then (testOutput) ->
	console.log(testOutput)
.catch (err) ->
	console.error(err.stack)