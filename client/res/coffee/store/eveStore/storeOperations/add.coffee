validateArguments = require('../typeValidator')
getInternalItem = require('../util/eveItem/getInternalItem')

runItemValidators = require('../util/eveItem/runItemValidators')

addItemToStore = require('../backendOperations/addItem')
updateStructure = require('../structure/updateStructure')


module.exports = (state, tag, persistent, item, expectInternalItem = false) ->
	# reorder arguments
	if arguments.length == 1
		item = tag
		persistent = null
		tag = null

	else if arguments.length == 2
		item = persistent
		if typeof tag == 'boolean'
			persistent = tag
			tag = null
		else
			persistent = null

	# validate arguments
	validateArguments([tag, persistent, item], ['string?', 'boolean?', 'object'])


	internalItem = null
	isInternalItem = false
	if !expectInternalItem
		if validateArguments.matches([item], ['externalItem'])
			internalItem = getInternalItem(item, state.fnArrays.undecorators)
			isInternalItem = true

	else if validateArguments.matches([item], ['internalItem'])
		isInternalItem = true


	if isInternalItem
		if !tag?
			tag = internalItem.meta.tag
		if !persistent?
			persistent = internalItem.meta.persistent
		item = internalItem.item

	runItemValidators(item, tag, state.fnArrays.validators)


	returnedItem = addItemToStore({
		item: item
		meta: {tag: tag, persistent: persistent}
		isExisting: false
	}, state.store, state.structure)

	state.structure = updateStructure.add(state.structure, returnedItem, state.store)
	return returnedItem

