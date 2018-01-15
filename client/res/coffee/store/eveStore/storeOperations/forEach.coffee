validateArguments = require('../typeValidator')


module.exports = (state, cb) ->
	validateArguments([cb], ['function'])

	state.store.db.forEachItem(cb)
	state.store.memory.forEachItem(cb)
	return