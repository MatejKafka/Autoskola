createWritableCollection = require('./util/createWritableCollection')

testObjTemplate =
	startTime: 'number'
	endTime: 'number'
	passScore: 'number'
	score: 'number'
	maxScore: 'number'
	passed: 'boolean'

module.exports = ->
	collectionTag = db.STORE_TAGS.PRACTICE_TEST
	return createWritableCollection(collectionTag, testObjTemplate, 5)