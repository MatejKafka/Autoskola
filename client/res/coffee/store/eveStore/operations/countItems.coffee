findItems = require('./findItems')


module.exports = (query, store, structure) ->
	if typeof query == 'string'
		return structure.byTag[query].length
	else
		return findItems(query, store, structure).length