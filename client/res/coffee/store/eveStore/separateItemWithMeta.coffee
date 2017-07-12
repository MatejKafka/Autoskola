module.exports = (itemWithMeta, metaSymbol) ->
	meta = itemWithMeta[metaSymbol]
	if !meta?
		meta = {}

	item = {}
	for key, value of itemWithMeta
		if key[0] == '$' && meta.hasOwnProperty(key.slice(1))
			continue
		item[key] = value

	return {
		item: item
		meta: meta
	}