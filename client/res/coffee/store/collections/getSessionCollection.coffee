createWritableCollection = require('./util/createWritableCollection')

testObjTemplate =
	startTime: 'number'
	endTime: 'number'

module.exports = ->
	collectionTag = db.STORE_TAGS.BROWSING_SESSION
	items = createWritableCollection(collectionTag, testObjTemplate, 5)

	# WARN: does not support multiple browsing sessions
	items.getNextId = ->
		if items.length == 0
			return 0
		else
			return items[items.length - 1].id + 1

	return items