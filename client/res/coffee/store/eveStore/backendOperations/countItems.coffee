findItems = require('./findItems')


module.exports = (query, store, structure) ->
	if typeof query == 'string'
		itemIds = structure.byTag[query]
		if itemIds?
			return itemIds.length

	# TODO (unimportant): could use its own method - would be probably faster
	return findItems(query, store, structure).length