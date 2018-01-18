validateArguments = require('../typeValidator')


module.exports = (state, eventInfoCb, cb) ->
	validateArguments([eventInfoCb, cb], ['function', 'function'])

	state.store.db.forEachItem(cb)
	state.store.memory.forEachItem(cb)
	return