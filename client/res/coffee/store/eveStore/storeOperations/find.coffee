findItemsInStore = require('../backendOperations/findItems')
validateArguments = require('../typeValidator')


module.exports = (state, query, shouldReturnSingleRecord = false) ->
	validateArguments([query, shouldReturnSingleRecord], ['query', 'boolean'])

	items = findItemsInStore(query, state.store, state.structure, shouldReturnSingleRecord)
		.filter((i) -> i?)

	return items
