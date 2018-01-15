module.exports = (store) ->
	store.__on '*', (operationType, message, infoObj, data) ->
		if infoObj?
			strData = Object.entries(infoObj)
				.map(([key, value]) -> return key + ': ' + value)
				.join(', ')

			if strData.length > 0
				strData = '\n\t' + '(' + strData + ')'
				if data?
					strData += '\n'
		else
			strData = ''

		console.log(operationType + ': ' + message + strData, data)