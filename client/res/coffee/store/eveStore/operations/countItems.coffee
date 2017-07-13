findItems = require('./findItems')


module.exports = (query, store, structure) ->
	if typeof query == 'string'
		itemIds = structure.byTag[query]
		if itemIds?
			return itemIds.length
	return findItems(query, store, structure).length