validateArguments = require('../typeValidator')
getItemFromStore = require('../backendOperations/getItem')


module.exports = (state, id) ->
	validateArguments([id], ['id'])

	return getItemFromStore(id, state.store, state.structure)