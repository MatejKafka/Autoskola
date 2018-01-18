CONFIG = require('../config/CONFIG')

getStackTrace = require('./util/getStackTrace')
sliceStackTrace = require('./util/sliceStackTrace')

removeFirstLine = (str) ->
	lines = str.split('\n')
	lines.shift()
	return lines.join('\n')

module.exports = (store) ->
	store.__on '*', (operationType, message, infoObj, data) ->
		if infoObj?
			strData = Object.entries(infoObj)
				.map(([key, value]) -> return key + ': ' + value)
				.join(', ')

			if strData.length > 0
				strData = '\n\t' + '(' + strData + ')'
		else
			strData = ''

		args = [operationType + ': ' + message + strData]
		if CONFIG.storeLogging.showLogData && data?
			args.push('\n', data)
		if CONFIG.storeLogging.showStackTraces
			args.push('\n' + removeFirstLine(sliceStackTrace(getStackTrace(), 3)))

		console.log.apply(console, args)