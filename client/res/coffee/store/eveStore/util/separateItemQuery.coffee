module.exports = (query) ->
	metaQuery = {}
	itemQuery = {}
	for own key, value of query
		if key[0] == '$'
			metaQuery[key.slice(1)] = value
		else
			itemQuery[key] = value

	return {
		item: itemQuery
		meta: metaQuery
	}