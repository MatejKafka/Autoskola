Promise = require('promise')
fs = require('fs')
recurse = require('./collectFiles')
f_testFn = require('./f_testFn')

MESSAGES = {
	resultNotObject: 'Test must return object'
	badResultFormat: 'Test must return object with properties `success` and `failure`'
	notArray: '`success` and `failure` properties of test result must be arrays'
}

fileExists = (path) ->
	return new Promise((fulfill, reject) ->
		fs.exists(path, (exists) ->
			if exists
				fulfill()
			else
				reject()
		)
	)


hasJsExtension = (filePath) ->
	lastSlashPosition = filePath.lastIndexOf('/')
	if lastSlashPosition == -1
		lastSlashPosition = 0
	fileName = filePath.substr(lastSlashPosition)
	split = fileName.split('.')

	if split.length > 1
		extension = split.pop()
		return extension == 'js' or extension == 'node'
	else
		return false


f_getTargetPath = (cutPath, targetPath) ->
	cutPosition = cutPath.length

	return (filePath) ->
		return targetPath + filePath.substr(cutPosition)


validateTestOutput = (output) ->
	if typeof output != 'object'
		return Promise.reject(new Error(MESSAGES.resultNotObject))

	if !output.success? or !output.failure?
		return Promise.reject(new Error(MESSAGES.badResultFormat))

	if !Array.isArray(output.success) || !Array.isArray(output.failure)
		return Promise.reject(new Error(MESSAGES.notArray))

	return Promise.resolve(output)


module.exports = (testPath, scriptPath) ->
	return new Promise((resolve) ->
		recurse(testPath)
		.then((files) ->
			result = []

			getTargetPath = f_getTargetPath(testPath, scriptPath)

			doneCounter = 0
			length = files.length

			nextDone = () ->
				doneCounter++
				if doneCounter == length
					resolve(result)

			result = []

			for tmp_filePath in files
				(->
					pushToResult = (error, testResult) ->
						result.push({
							path: {
								test: filePath
								target: targetPath
							}
							error: error
							result: testResult
						})
						nextDone()

					filePath = tmp_filePath

					if hasJsExtension(filePath)
						targetPath = getTargetPath(filePath)

						fileExists(targetPath)
						.then(->
							handler = require(filePath)

							if typeof handler == 'function'
								testFn = f_testFn()

								returnValue = new Promise((resolve, reject) ->
									try
										Promise.resolve(handler(targetPath, testFn))
										.then(->
											resolve(testFn.result)
										)
									catch error
										# error occured while executing the test
										reject(error)
								)
							else
								returnValue = handler

							Promise.resolve(returnValue)
							.then(validateTestOutput)
							.then((output) ->
								return [null, output]
							, (error) ->
								return [error]
							)
							.then((currentResult) ->
								pushToResult(currentResult[0], currentResult[1])
							)
						, ->
							pushToResult(new Error('Target file doesn\'t exists'))
						)
					else
						nextDone()
				)()

			return result
		)
	)