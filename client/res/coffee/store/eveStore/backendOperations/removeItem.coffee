validateArguments = require('../typeValidator')

module.exports = (itemId, store, structure) ->
	validateArguments(arguments, ['id'])

	switch structure.location[itemId]
		when structure.LOCATIONS.DB
			return store.db.removeItem(itemId)
		when structure.LOCATIONS.MEMORY_STORE
			return store.memory.removeItem(itemId)
		else
			return null