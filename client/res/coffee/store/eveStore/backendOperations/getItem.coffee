validate = require('../typeValidator')


module.exports = (id, eventInfoCb, store, structure) ->
	validate([id, eventInfoCb], ['id', 'function'])

	switch structure.location[id]
		when structure.LOCATIONS.DB
			return store.db.readItem(id)
		when structure.LOCATIONS.MEMORY_STORE
			return store.memory.readItem(id)
		else
			return null