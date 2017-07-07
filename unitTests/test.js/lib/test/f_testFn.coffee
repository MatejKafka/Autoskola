test = (boolValue) ->
	if typeof boolValue != 'boolean'
		throw new TypeError('Tested value must be boolean, not ' + typeof boolValue)

	return boolValue

module.exports = ->
	testResult = {
		success: []
		failure: []
	}

	testFn = (value, message) ->
		if typeof value == 'boolean'
			successful = test(value)

		else if Array.isArray(value)
			successful = true
			for item in value
				if !test(item)
					successful = false
					break
		else
			throw new TypeError('input must be boolean or array')

		if successful
			target = 'success'
		else
			target = 'failure'

		testResult[target].push(message)


	testFn.result = testResult

	return testFn