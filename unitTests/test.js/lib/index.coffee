TEST_ROOT_DIR = path.resolve(__dirname, '..')
DEFAULT_HISTORY_PATH = path.resolve(TEST_ROOT_DIR, './history.json')


path = require('path')

executeTest = require('./test/execute')
processTestResult = require('./process/wrapper')

readTestHistory = require('./history/read')
writeTestHistory = require('./history/write')

humanifyOutput = require('./output/humanify')
stringifyOutput = require('./output/stringify')


module.exports = (testerDirPath, targetDirPath, historyPath = DEFAULT_HISTORY_PATH) ->
	resultPromise = executeTest(testerDirPath, targetDirPath)
	historyPromise = readTestHistory(historyPath)

	return processTestResult(resultPromise, historyPromise)
	.then(humanifyOutput)
	.then((testOutput) ->
		testOutput.writePromise = writeTestHistory(historyPath, testOutput.raw)
		delete testOutput.raw
		return testOutput
	)
	.then(stringifyOutput)
	.then((textOutput) ->
		console.log(textOutput)
	, (error) ->
		console.log error.stack
	)