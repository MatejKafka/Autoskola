getInternalItem = require('../util/eveItem/getInternalItem')
validateArguments = require('../typeValidator')

addItemToStore = require('../backendOperations/addItem')
removeItemFromStore = require('../backendOperations/removeItem')
updateStructure = require('../structure/updateStructure')


module.exports = (state, eventInfoCb, item, expectInternalItem = false) ->
	itemType = if expectInternalItem then 'internalItem' else 'externalItem'
	validateArguments([item, eventInfoCb], [itemType, 'function'])

	if expectInternalItem
		parsedItem = item
	else
		parsedItem = getInternalItem(item, state.fnArrays.undecorators, state.fnArrays.validators)
	parsedItem.isExisting = true

	removeItemFromStore(parsedItem.meta.id, eventInfoCb, state.store, state.structure)
	returnedItem = addItemToStore(parsedItem, eventInfoCb, state.store)
	state.structure = updateStructure.change(state.structure, returnedItem, state.store)

	return returnedItem