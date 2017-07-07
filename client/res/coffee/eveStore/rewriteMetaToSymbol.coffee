module.exports = (itemAndMeta, metaSymbol) ->
	if !itemAndMeta?
		return null
	{item, meta} = itemAndMeta
	item[metaSymbol] = meta
	return item