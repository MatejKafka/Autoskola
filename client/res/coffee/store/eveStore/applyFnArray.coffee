module.exports = (item, fnArr, additionalParam, checkForReturnValue) ->
	if !fnArr?
		return item

	originalItem = item
	for fn in fnArr
		item = fn(item, additionalParam)
		if checkForReturnValue && item != originalItem
			throw new Error('processor function must return modified item, not new object')
	return item