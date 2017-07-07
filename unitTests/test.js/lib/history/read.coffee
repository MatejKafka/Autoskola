file = require('../promisifiedFs')

MESSAGES = {
	badJson: 'Could not parse the history JSON'
}


module.exports = (historyFilePath) ->
	return file.exists(historyFilePath).then(->
		return file.read(historyFilePath)
	).then((rawHistory) ->
		# parse history file content
		try
			return JSON.parse(rawHistory)
		catch
			throw new Error(MESSAGES.badJson)
	, ->
		# file does not exist -> history is empty
		return []
	).then((history) ->
		# returns last test result for particular files
		lastLogHistory = {}

		for fileLog in history
			last = fileLog.data[fileLog.data.length - 1]
			if last != undefined
				lastLogHistory[fileLog.file] = last

		return {
			last: lastLogHistory
			raw: history
		}
	)