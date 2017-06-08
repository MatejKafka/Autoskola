arrayStore = require('./arrayStore')
validateObjStructure = require('../util/validateObjStructure')


answerObjTemplate = {
	mode: 'string'
	correctlyAnswered: 'boolean|null'
	selectedAnswerIndex: 'number|null'
	questionId: 'number'
	sections: 'optimizedArray|null|undefined'
	questionTypes: 'optimizedArray|null|undefined'
	testId: 'number|null|undefined'
	questionIndex: 'number'
	attemptNumber: 'number'
}

validateAnswerObj = (answerObj) ->
	return validateObjStructure(answerObj, answerObjTemplate)



module.exports = (storeName) ->
	{items, erasedBlockCount} = arrayStore.load(storeName)
	positionCache = {}

	addToCache = (index, item) ->
		if !positionCache[item.questionId]?
			positionCache[item.questionId] = [index]
		else
			positionCache[item.questionId].push(index)


	for item, i in items
		addToCache(i, item)


	getNextId = ->
		if items.length == 0
			return 0
		return items[items.length - 1].id + 1

	addToArr = (answerObj) ->
		validateAnswerObj(answerObj)
		record = Object.assign({}, answerObj)
		id = getNextId()
		record.id = id

		time = Date.now()
		record.time = time

		index = items.push(record) - 1
		addToCache(index, record)
		return record.id


	items.removeFirstChunk = ->
		arrayStore.removeFirstChunk(storeName)

	items.forceWrite = (_newItems) ->
		writeItems = items
		if _newItems?
			writeItems = _newItems
		arrayStore.save(storeName, writeItems, {force: true, erasedBlockCount})


	items.add = (answerObj) ->
		if !Array.isArray(answerObj)
			id = addToArr(answerObj)
			arrayStore.save(storeName, items, {erasedBlockCount})
			return id
		else
			ids = for answer in answerObj
				addToArr(answer)
			arrayStore.save(storeName, items, {erasedBlockCount})
			return ids


	items.getAnswersByQuestionId = (questionId) ->
		if !positionCache[questionId]?
			return []
		else
			return positionCache[questionId].map((i) -> items[i])

	return items