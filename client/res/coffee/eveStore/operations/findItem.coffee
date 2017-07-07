getItem = require('./getItem')


testObj = (meta, query) ->
	if typeof meta != 'object'
		return false

	for key, value of query
		if typeof value == 'function'
			if !value(meta[key])
				return false
		else if typeof value == 'object'
			if !testObj(meta[key], value)
				return false
		else
			if meta[key] != value
				return false
	return true

matchesQuery = (item, itemQuery, metaQuery) ->
	return testObj(item.item, itemQuery) &&
		testObj(item.meta, metaQuery)


handleSingleMetaParamQuery = (metaQuery, store, structure) ->
	if metaQuery.id? && typeof metaQuery.id == 'number'
		return [getItem(metaQuery.id, store, structure)]

	else if metaQuery.tag? && typeof metaQuery.tag == 'string'
		itemIds = structure.byTag[metaQuery.tag]
		if !itemIds?
			return []
		items = itemIds.map (id) ->
			getItem(id, store, structure)
		return items

	else if metaQuery.persistent? && metaQuery.persistent == 'boolean'
		targetStore = if metaQuery.persistent then store.db else store.memory
		return targetStore.readAllItems()

	return null


module.exports = (query, store, structure) ->
	if !query?
		return store.db.readAllItems().concat(store.memory.readAllItems())

	if typeof query == 'number'
		# id
		query = {$id: query}
	else if typeof query == 'string'
		# tag
		query = {$tag: query}
	else if typeof query != 'object'
		throw new Error("findItem only accepts query object, id or tag, not #{typeof query}")


	metaQuery = {}
	itemQuery = {}
	for own key, value of query
		if key[0] == '$'
			metaQuery[key.slice(1)] = value
		else
			itemQuery[key] = value


	if Object.keys(itemQuery).length == 0 && Object.keys(metaQuery).length == 1
		result = handleSingleMetaParamQuery(metaQuery, store, structure)
		if result?
			return result


	if metaQuery.tag? && typeof metaQuery.tag == 'string'
		if !structure.byTag[metaQuery.tag]?
			return []
		items = structure.byTag[metaQuery.tag]
			.map (id) -> getItem(id, store, structure)

		if metaQuery.persistent? && typeof metaQuery.persistent == 'boolean'
			items = items.filter((item) -> item.meta.persistent = metaQuery.persistent)

	else if metaQuery.persistent? && typeof metaQuery.persistent == 'boolean'
		if metaQuery.persistent
			items = store.db.readAllItems()
		else
			items = store.memory.readAllItems()
	else
		items = store.memory.readAllItems().concat(store.db.readAllItems())

	matches = items.filter (item) ->
		return matchesQuery(item, itemQuery, metaQuery)

	return matches