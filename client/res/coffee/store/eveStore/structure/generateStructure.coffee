getClearStructure = require('./getClearStructure')
updateStructure = require('./updateStructure')

forEachItem = (store, fn) ->
	store.memory.forEachItem(fn)
	store.db.forEachItem(fn)


module.exports = (store) ->
	structure = getClearStructure()

	forEachItem store, (item) ->
		updateStructure.add(structure, item, store)

	return structure