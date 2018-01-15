module.exports = (store) ->
	store.__on '*', (operationType, message, infoObj, data) ->
		strData = Object.entries(infoObj)
			.map(([key, value]) -> return key + ': ' + value)
			.join(', ')

		if strData.length > 0
			strData = '(' + strData + ')'

		console.log(operationType + ': ' + message + '\n\t' + strData, data)