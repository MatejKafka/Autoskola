validateArguments = require('../typeValidator')
removeItemFromStore = require('../backendOperations/removeItem')
updateStructure = require('../structure/updateStructure')
getInternalItem = require('../util/eveItem/getInternalItem')


getItemId = (item, expectInternalItem) ->
	if validateArguments.matches([item], ['id'])
		return item

	if expectInternalItem
		validateArguments([item], ['internalItem'])
		return item.meta.id

	validateArguments([item], ['externalItem'])
	return getInternalItem(item).meta.id


# itemId can be id, item, or array of either
removeItem = module.exports = (state, item, expectInternalItem = false) ->
	# item is array
	if Array.isArray(item)
		removedItems = for item in item
			removeItem(state, item)
		return removedItems


	validateArguments([item], ['id|externalItem|internalItem'])

	itemId = getItemId(item, expectInternalItem)
	removedItem = removeItemFromStore(itemId, state.store, state.structure)
	if removedItem?
		state.structure = updateStructure.remove(state.structure, removedItem, state.store)

	return removedItem