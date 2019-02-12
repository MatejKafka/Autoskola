getDb = require('../storage/getDb')
getMemoryStore = require('../storage/getMemoryStore')
generateStructure = require('../structure/generateStructure')


module.exports = (storeNamespace) ->
	store =
		db: getDb(storeNamespace)
		memory: getMemoryStore()
		namespace: storeNamespace

	return {
		store: store
		fnArrays:
			validators: {}
			decorators: {}
			undecorators: {}
		structure: generateStructure(store)
	}