validateObjStructure = require('./validateObjStructure')
removeOldestEntries = require('./removeOldestEntries')



module.exports = (collectionTag, itemTemplate, chunkSize = 10) ->
	items = store.find(collectionTag).sort (a, b) ->
		return a.$id - b.$id

	getNextId = ->
		if items.length == 0
			return 0
		else
			return items[items.length - 1].id + 1

	addToArr = (item) ->
		validateObjStructure(item, itemTemplate)
		record = Object.assign({}, item)
		if !record.id?
			record.id = getNextId()

		item = store.add(collectionTag, record)
		items.push(item)
		return record.id


	items.removeOldestChunk = ->
		return removeOldestEntries(collectionTag, chunkSize)

	items.add = (itemObj) ->
		if !Array.isArray(itemObj)
			return addToArr(itemObj)
		else
			ids = for answer in itemObj
				addToArr(answer)
			return ids

	return items