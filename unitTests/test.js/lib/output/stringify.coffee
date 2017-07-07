require('./colors')
Promise = require('promise')

INDENT_CHAR = '    '

addPart = (add, obj) ->
	return fn = (propName, type = 'basic') ->
		if obj[propName].length > 0
			add(2, (propName.toUpperCase() + ':').heading3)
			for item in obj[propName]
				add(3, item[type])

		return fn


stringifyRawResult = (add, rawResult) ->
	if rawResult.length > 0
		add(0, '')
		add(0, 'TEST RESULT:'.heading)
		for fileResult in rawResult
			add(1, ('FILE: '.heading2 + fileResult.file).heading2)

			addPart(add, fileResult.state)('success', 'success')('failure', 'error')


stringifyChanges = (add, changes) ->
	if changes.length > 0
		add(0, '')
		add(0, 'CHANGES:'.heading)
		for fileTestChanges in changes
			add(1, ('FILE: ' + fileTestChanges.file).heading2)

			addPart(add, fileTestChanges.changes)('success', 'success')('failure', 'error')('added')('removed')


stringifyErrors = (add, errors) ->
	if errors.length > 0
		add(0, '')
		add(0, 'ERRORS:'.heading)
		for error in errors
			add(1, ('FILE: ' + error.file).heading2)
			add(2, error.error.message.error)


module.exports = (outputData) -> # TODO: use colors
	return new Promise((resolve) ->
		textOutputArr = []

		str_repeat = (times, char) ->
			new Array(times + 1).join(char)

		add = (indentation, text) ->
			indent = str_repeat(indentation, INDENT_CHAR)
			textOutputArr.push(indent + text)

		stringifyRawResult(add, outputData.all)
		stringifyChanges(add, outputData.new)
		stringifyErrors(add, outputData.errors)

		add(0, '')
		outputData.writePromise.then(->
			add(0, 'Current test result written to file')
		, (error) ->
			add(0, error.message)
		)
		.then(->
			resolve(textOutputArr.join('\n'))
		)
	)