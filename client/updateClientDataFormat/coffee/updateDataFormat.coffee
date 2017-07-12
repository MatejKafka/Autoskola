loadArrayStore = require('./loadArrayStore')


convertArrayStore = (arrayStoreName, collectionTag, store, processItemFn) ->
	if typeof processItemFn != 'function'
		processItemFn = (item) -> item

	items = loadArrayStore(arrayStoreName)
	newItems = for item, i in items
		store.add(collectionTag, processItemFn(item, i))
	return newItems


module.exports = (store, collections) ->
	collectionItems = for collection in collections
		convertArrayStore(collection.arrayStoreName, collection.storeTag, store, collection.processItemFn)
	return collectionItems