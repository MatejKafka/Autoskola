sliceStackTrace = require('./sliceStackTrace')

getStackTrace = module.exports = ->
	if Error.captureStackTrace?
		container = {}
		Error.captureStackTrace(container, getStackTrace)
		return container.stack
	else
		try
			throw new Error('')
		catch err
			return sliceStackTrace(err.stack, 1)