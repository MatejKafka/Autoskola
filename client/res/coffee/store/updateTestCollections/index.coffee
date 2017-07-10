serverApi = require('./serverApi')
updateCollection = require('./updateCollection')

updateSections = ->
	return updateCollection(db.STORE_TAGS.SECTION, serverApi.getSection)
updateQuestions = ->
	return updateCollection(db.STORE_TAGS.QUESTION, serverApi.getQuestion)


module.exports = ->
	return Promise.all([updateSections(), updateQuestions()])
	.then ->
		return