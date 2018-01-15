validateArguments = require('../typeValidator')
countItemsInStore = require('../backendOperations/countItems')


module.exports = (state, query) ->
	validateArguments([query], ['query'])
	return countItemsInStore(query, state.store, state.structure)