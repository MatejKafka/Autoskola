module.exports = (state) ->
	return state.store.db.isEmpty() && state.store.memory.isEmpty()