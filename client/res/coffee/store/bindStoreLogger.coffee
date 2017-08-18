module.exports = (store) ->
	store.__on '*', (message, strData, data, operationType) ->
		console.log(operationType + ': ' + message + '\n\t' + strData)