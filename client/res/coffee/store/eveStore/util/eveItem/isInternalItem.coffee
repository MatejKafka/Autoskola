module.exports = (item) ->
	return typeof item.item == 'object' && typeof item.meta == 'object'