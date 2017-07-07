isEmpty = (array) ->
	return array.length == 0

testResultChanged = (difference) ->
	return !isEmpty(difference.success) or !isEmpty(difference.failure) or !isEmpty(difference.added) or !isEmpty(difference.removed)


module.exports = (testOutput) ->
	result = testOutput.result

	currentTestStates = []
	testErrors = []
	newChanges = []

	for fileResult in result
		file = fileResult.file
		testResult = fileResult.all
		testError = fileResult.error
		changes = fileResult.new

		if testError?
			testErrors.push(
				file: file
				error: testError
			)
		else
			currentTestStates.push({
				file: file
				state: testResult
			})

			if testResultChanged(changes)
				newChanges.push({
					file: file
					changes: changes
				})


	return {
		all: currentTestStates
		errors: testErrors
		new: newChanges
		raw: testOutput.raw
	}