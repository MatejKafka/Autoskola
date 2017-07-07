file = require('../promisifiedFs')

MESSAGES = {
	error: 'Could not save the history file: '
}

module.exports = (filePath, data) ->
	return file.write(filePath, JSON.stringify(data))
	.then(null, (error) ->
		throw new Error(MESSAGES.error + error.stack)
	)