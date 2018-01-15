getClearStructure = require('../structure/getClearStructure')


module.exports = (state) ->
	state.store.db.clear()
	state.store.memory.clear()
	state.structure = getClearStructure()
	return