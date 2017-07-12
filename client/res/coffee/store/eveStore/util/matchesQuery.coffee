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


module.exports = (item, itemQuery, metaQuery) ->
	return testObj(item.item, itemQuery) &&
		testObj(item.meta, metaQuery)