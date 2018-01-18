findItemsInStore = require('../backendOperations/findItems')
validateArguments = require('../typeValidator')


module.exports = (state, eventInfoCb, query, shouldReturnSingleRecord = false) ->
	validateArguments([query, eventInfoCb, shouldReturnSingleRecord], ['query', 'function', 'boolean'])

	items = findItemsInStore(query, eventInfoCb, state.store, state.structure, shouldReturnSingleRecord)
		.filter((i) -> i?)

	return items
