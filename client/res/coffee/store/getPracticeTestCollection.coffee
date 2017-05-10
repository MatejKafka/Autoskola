arrayStore = require('./arrayStore')
validateObjStructure = require('../validateObjStructure')


testObjTemplate = {
	startTime: 'number'
	endTime: 'number'
	passScore: 'number'
	score: 'number'
	maxScore: 'number'
	passed: 'boolean'
}
validateAnswerObj = (obj) ->
	return validateObjStructure(obj, testObjTemplate)


module.exports = (storeName) ->
	{items, erasedBlockCount} = arrayStore.load(storeName)

	addToArr = (testObj) ->
		validateAnswerObj(testObj)
		record = Object.assign({}, testObj)
		if items.length == 0
			id = 0
		else
			id = (items[items.length - 1].id) + 1
		record.id = id

		items.push(record)
		return record.id


	items.removeFirstChunk = ->
		arrayStore.removeFirstChunk(storeName)

	items.forceWrite = (_newItems) ->
		writeItems = items
		if _newItems?
			writeItems = _newItems
		arrayStore.save(storeName, writeItems, {force: true, erasedBlockCount})

	items.add = (itemObj) ->
		if !Array.isArray(itemObj)
			id = addToArr(itemObj)
			arrayStore.save(storeName, items, {erasedBlockCount})
			return id
		else
			ids = for answer in itemObj
				addToArr(answer)
			arrayStore.save(storeName, items, {erasedBlockCount})
			return ids

	return items