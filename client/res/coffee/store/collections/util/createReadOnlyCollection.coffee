module.exports = (collectionTag) ->
	items = store.find(collectionTag).sort (a, b) ->
		return a.$id - b.$id

	idCache = {}
	for item, i in items
		idCache[item.id] = item


	items.get = (id) ->
		if !id?
			return @items
		if idCache[id]?
			return idCache[id]
		return null

	return items