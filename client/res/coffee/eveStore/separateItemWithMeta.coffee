module.exports = (itemWithMeta, metaSymbol) ->
	meta = itemWithMeta[metaSymbol]
	if !meta?
		meta = {}

	item = {}
	for key, value of itemWithMeta
		item[key] = value
		
	return {
		item: item
		meta: meta
	}