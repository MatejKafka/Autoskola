module.exports = (error, sliceIndex) ->
	try
		throw new error.constructor(error.message)
	catch err
		lines = err.stack.split('\n')
		lines.splice(1, 1 + sliceIndex)
		err.stack = lines.join('\n')
		return err