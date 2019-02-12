module.exports = (traceStr, sliceIndex) ->
	lines = traceStr.split('\n')
	lines.splice(1, 1 + sliceIndex)
	return lines.join('\n')