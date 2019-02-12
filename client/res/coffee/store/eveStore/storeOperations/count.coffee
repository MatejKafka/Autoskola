validateArguments = require('../typeValidator')
countItemsInStore = require('../backendOperations/countItems')


module.exports = (state, eventInfoCb, query) ->
	validateArguments([query, eventInfoCb], ['query', 'function'])
	return countItemsInStore(query, eventInfoCb, state.store, state.structure)