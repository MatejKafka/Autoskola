module.exports = (itemAndMeta, metaSymbol) ->
	if !itemAndMeta?
		return null
	{item, meta} = itemAndMeta
	item[metaSymbol] = meta

	for key of meta
		do (key) ->
			item.__defineGetter__('$' + key, -> meta[key])

	return item