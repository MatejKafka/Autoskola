module.exports = (itemAndMeta, metaSymbol) ->
	if !itemAndMeta?
		return null
	{item, meta} = itemAndMeta
	item[metaSymbol] = meta

	for key of meta
		do (key) ->
			item.__defineGetter__('$' + key, -> meta[key])
			# TODO: probably add some validation
			item.__defineSetter__('$' + key, (newValue) -> meta[key] = newValue)

	return item