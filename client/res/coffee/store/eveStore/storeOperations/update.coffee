getInternalItem = require('../util/eveItem/getInternalItem')
validateArguments = require('../typeValidator')

addItemToStore = require('../backendOperations/addItem')
removeItemFromStore = require('../backendOperations/removeItem')
updateStructure = require('../structure/updateStructure')


module.exports = (state, item, expectInternalItem = false) ->
	itemType = if expectInternalItem then 'internalItem' else 'externalItem'
	validateArguments([item], [itemType])

	if expectInternalItem
		parsedItem = item
	else
		parsedItem = getInternalItem(item, state.fnArrays.undecorators, state.fnArrays.validators)
	parsedItem.isExisting = true

	removeItemFromStore(parsedItem.meta.id, state.store, state.structure)
	returnedItem = addItemToStore(parsedItem, state.store, state.structure)
	state.structure = updateStructure.change(state.structure, returnedItem, state.store)

	return returnedItem