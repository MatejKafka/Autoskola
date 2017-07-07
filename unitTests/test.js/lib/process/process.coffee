getDifference = require('./getDifference')
f_writeToHistoryArray = require('./f_writeToHistoryArray')

###
INPUT:
	testResults: [
		{
    		path: {test, target - strings}
			error: Error || null
			result: undefined || {success, failure - arrays of string}
    	}
    ]
    history: {
    	fileName: {
    		date: timestamp
    		success: array of string
    		failure: array of string
    	}
    }
    rawHistory: [
    	{
    		file: string - file path
    		data: [
    			{
					date: timestamp
					success: array of string
					failure: array of string
				}
    			...
    		]
    	}
    ]

OUTPUT:
    [
    	{
    		file: string - path to target file
    		all: undefined || {success, failure - arrays of string}
    		error: Error || null
    		new: undefined || {
				success: array of newly successful tests
				failure: array of newly failed tests
				added: new tests
				removed: removed tests
    		}
    	}
    ]
###
module.exports = (testResults, history, rawHistory) ->
	writeToTestHistory = f_writeToHistoryArray(rawHistory)

	# store current datetime, so all tests from one set will have same timestamp
	date = Date.now()
	result = []

	for fileTest in testResults
		targetFile = fileTest['path'].target

		# saves test to output array
		pushLog = (error, newChanges) ->
			result.push({
				file: targetFile
				all: fileTest.result
				error: error
				new: newChanges
			})


		if fileTest.error?
			# error occurred during test execution or result validation
			pushLog(fileTest.error, undefined)

		else

			# retrieve test history for this particular file
			fileHistory = history[targetFile]

			# compare current test with last test - get differences
			# if no last test, difference is done compared to empty test
			difference = getDifference(fileTest.result, fileHistory)

			# save the difference to list
			pushLog(null, difference)

			# pushes current test data to test history
			writeToTestHistory(targetFile, {
				date: date
				success: fileTest.result.success
				failure: fileTest.result.failure
			})


	return result