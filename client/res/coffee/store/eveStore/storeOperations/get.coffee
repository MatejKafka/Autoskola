validateArguments = require('../typeValidator')
getItemFromStore = require('../backendOperations/getItem')


module.exports = (state, eventInfoCb, id) ->
	validateArguments([id, eventInfoCb], ['id', 'function'])

	return getItemFromStore(id, eventInfoCb, state.store, state.structure)