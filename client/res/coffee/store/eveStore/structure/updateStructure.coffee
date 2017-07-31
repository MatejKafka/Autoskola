findItems = require('../operations/findItems')
matchesQuery = require('../util/matchesQuery')
separateItemQuery = require('../util/separateItemQuery')
isEmptyObj = require('../util/isEmptyObj')


separateQuery = (cacheQuery) ->
	findQuery = {}
	cachePropQuery = {}
	for key, value of cacheQuery
		if value? && typeof value == 'object'
			{find, cache} = separateQuery(value)
			if !isEmptyObj(find) then findQuery[key] = find
			if !isEmptyObj(cache) then cachePropQuery[key] = cache
		else if value?
			findQuery[key] = value
		else
			cachePropQuery[key] = null
	return {
		find: findQuery
		cache: cachePropQuery
	}


getValueFromItem = (item, key, isMeta) ->
	if isMeta
		return item.meta[key]
	else
		return item.item[key]


# ALL FUNCTIONS ARE IMPURE - to purify, they should copy structure before altering
module.exports = updateStructure =
	add: (structure, item) ->
		structure.location[item.meta.id] = if item.meta.persistent
				structure.LOCATIONS.DB
			else
				structure.LOCATIONS.MEMORY_STORE

		if item.meta.tag?
			if !structure.byTag[item.meta.tag]?
				structure.byTag[item.meta.tag] = []
			structure.byTag[item.meta.tag].push(item.meta.id)

		for query in structure.byQuery
			if matchesQuery(item, query.findQuery.item, query.findQuery.meta)
				key = getValueFromItem(item, query.cachedKey, query.isMetaKey)
				if !query.values[key]?
					query.values[key] = []
				query.values[key].push(item.meta.id)

		return structure


	remove: (structure, item) ->
		if !structure.location[item.meta.id]?
			return
		delete structure.location[item.meta.id]

		if item.meta.tag?
			tagCache = structure.byTag[item.meta.tag]
			tagCache.splice(tagCache.indexOf(item.meta.id), 1)
			if tagCache.length == 0
				delete structure.byTag[item.meta.tag]

		for query in structure.byQuery
			key = getValueFromItem(item, query.cachedKey, query.isMetaKey)
			if !query.values[key]?
				continue
			index = query.values[key].indexOf(item.meta.id)
			if index >= 0
				query.values[key].splice(index, 1)
				if query.values[key].length == 0
					delete query.values[key]

		return structure


	change: (structure, item) ->
		updateStructure.remove(structure, item)
		return updateStructure.add(structure, item)


	cacheQuery: (structure, query, store) ->
		{find: findQuery, cache: cacheQuery} = separateQuery(query)
		keys = Object.keys(cacheQuery)
		if keys.length != 1 || cacheQuery[keys[0]] != null
			throw new Error('current implementation of cached queries only supports single cached parameter (not nested)')

		propKey = keys[0]
		isMeta = propKey[0] == '$'
		if isMeta
			propKey = propKey.slice(1)
		propMap = {}
		items = findItems(findQuery, store, structure, false)
		for item in items
			value = getValueFromItem(item, propKey, isMeta)
			if !propMap[value]?
				propMap[value] = []
			propMap[value].push(item.meta.id)

		structure.byQuery.push({
			fullQuery: query
			findQuery: separateItemQuery(findQuery)
			rawFindQuery: findQuery
			cachedKey: propKey
			isMetaKey: isMeta
			values: propMap
		})
		return structure