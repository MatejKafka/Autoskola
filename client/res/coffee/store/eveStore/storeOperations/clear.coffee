getClearStructure = require('../structure/getClearStructure')
validate = require('../typeValidator')


module.exports = (state, eventInfoCb) ->
	validate([eventInfoCb], ['function'])

	state.store.db.clear()
	state.store.memory.clear()
	state.structure = getClearStructure()
	return