module.exports = (item, metaSymbol) ->
	if item == null
		throw new Error('item must be object, not null')
	if typeof item != 'object'
		throw new Error('item must be object, not ' + typeof item)
	if !item[metaSymbol]?
		throw new Error('item is not eveStore item - you must only pass item object generated by eveStore')