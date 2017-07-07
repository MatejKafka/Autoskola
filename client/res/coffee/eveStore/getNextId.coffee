module.exports = (store) ->
	lastId = store.memory.read('lastAssignedId')
	if !lastId?
		lastId = store.db.read('lastAssignedId')

	if lastId?
		id = lastId + 1
	else
		id = 0

	store.memory.write('lastAssignedId', id)
	store.db.write('lastAssignedId', id)
	return id