createWritableCollection = require('./util/createWritableCollection')

answerObjTemplate =
	mode: 'string'
	correctlyAnswered: 'boolean|null'
	selectedAnswerIndex: 'number|null'
	questionId: 'number'
	sections: 'optimizedArray|null|undefined'
	questionTypes: 'optimizedArray|null|undefined'
	testId: 'number|null|undefined'
	questionIndex: 'number'
	attemptNumber: 'number'


module.exports = ->
	collectionTag = db.STORE_TAGS.ANSWER

	items = createWritableCollection(collectionTag, answerObjTemplate, 15)

	positionCache = {}
	addToCache = (index, questionId) ->
		if !positionCache[questionId]?
			positionCache[questionId] = [index]
		else
			positionCache[questionId].push(index)


	for item, i in items
		addToCache(i, item.questionId)


	oldAdd = items.add
	items.add = (answerObj) ->
		record = Object.assign({}, answerObj)
		record.time = Date.now()

		id = oldAdd(record)
		addToCache(items.length - 1, record.questionId)
		return id

	items.getAnswersByQuestionId = (questionId) ->
		if !positionCache[questionId]?
			return []
		else
			return positionCache[questionId].map((i) -> items[i])

	return items