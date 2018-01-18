validateArguments = require('../typeValidator')


module.exports = (state, eventInfoCb) ->
	validateArguments([eventInfoCb], ['function'])

	return state.store.db.isEmpty() && state.store.memory.isEmpty()