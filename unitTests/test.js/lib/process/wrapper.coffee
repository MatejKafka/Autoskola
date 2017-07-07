Promise = require('promise')
processTest = require('./process')


module.exports = (resultPromise, historyPromise) ->
	return Promise.all([resultPromise, historyPromise]).then((resultArr) ->
		testResults = resultArr[0]
		history = resultArr[1].last
		rawHistory = resultArr[1].raw

		result = processTest(testResults, history, rawHistory)

		return {
			raw: rawHistory
			result: result
		}
	)