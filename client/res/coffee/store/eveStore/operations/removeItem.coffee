module.exports = (itemOrId, store, structure) ->
	if typeof itemOrId == 'object'
		id = itemOrId.meta.id
	else
		id = itemOrId

	switch structure.location[id]
		when structure.LOCATIONS.DB
			return store.db.removeItem(id)
		when structure.LOCATIONS.MEMORY_STORE
			return store.memory.removeItem(id)
		else
			return null