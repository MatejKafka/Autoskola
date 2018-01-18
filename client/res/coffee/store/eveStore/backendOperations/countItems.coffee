findItems = require('./findItems')
validateArguments = require('../typeValidator')


module.exports = (query, eventInfoCb, store, structure) ->
	validateArguments([query, eventInfoCb], ['query', 'function'])

	if typeof query == 'string'
		itemIds = structure.byTag[query]
		if itemIds?
			return itemIds.length

	# TODO (unimportant): could use its own method - would be probably faster
	return findItems(query, eventInfoCb, store, structure).length