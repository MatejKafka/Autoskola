EVENT_INFO_TYPES = require('./EVENT_INFO_TYPES')

getExternalItem = require('./util/eveItem/getExternalItem')
getInternalItem = require('./util/eveItem/getInternalItem')

validateArguments = require('./typeValidator')

StorageFullError = require('./storage/StorageFullError')
createStoreState = require('./util/createStoreStateObject')
updateStructure = require('./structure/updateStructure')
stringifyQuery = require('./util/stringifyQuery')
storeOperations = require('./storeOperations')


ALREADY_LOADED_NAMESPACES = []

module.exports = (storeNamespace) ->
	if ALREADY_LOADED_NAMESPACES.indexOf(storeNamespace) > -1
		throw new Error('eveStore instance already loaded for this namespace - only one instance for each namespace is allowed')
	ALREADY_LOADED_NAMESPACES.push(storeNamespace)

	state = createStoreState(storeNamespace)


	listeners = {}
	emit = (opType, message, infoObj = null, data = null) ->
		validateArguments(arguments, ['string', 'string', 'object?', 'object?'])

		if infoObj?
			infoObj.namespace = state.store.namespace
		if data?
			data.namespace = state.store.namespace

		emitTime = Date.now()
		if listeners[opType]?
			for cb in listeners[opType]
				cb(opType, message, infoObj, data, emitTime)
		if listeners['*']?
			for cb in listeners['*']
				cb(opType, message, infoObj, data, emitTime)
		return


	# TODO: add possibility to use multiple tags for single item
	return {
		add: (tag, persist, item) ->
			internalItem = storeOperations.add(state, (->), tag, persist, item)
			addedItem = getExternalItem(internalItem, state.fnArrays.decorators)

			emit('add', "Added new item",
				{id: addedItem.$id, persist: addedItem.$persistent, tag: addedItem.$tag}
				{item: addedItem})
			return addedItem


		update: (item) ->
			internalItem = storeOperations.update(state, (->), item)
			updatedItem = getExternalItem(internalItem, state.fnArrays.decorators)

			emit('update', "Updated item", {id: updatedItem.$id}, {item: updatedItem})
			return updatedItem


		# itemToRemove can be id, item, or array of either
		remove: (itemToRemove) ->
			removedItem = storeOperations.remove(state, (->), itemToRemove)

			if !removedItem?
				# no found item
				emit('remove', "Attempted to remove missing item",
					{id: (if typeof itemToRemove == 'number' then itemToRemove else itemToRemove.$id), itemCount: 0},
					{item: itemToRemove, itemCount: 0})
				return null

			if Array.isArray(removedItem)
				# multiple items
				externalItems = removedItem
					.filter((item) -> item?)
					.map((item) -> getExternalItem(item, state.fnArrays.decorators))

				emit('remove', "Removed multiple items",
					{itemCount: externalItems.length}
					{item: externalItems, itemCount: externalItems.length})
				return externalItems

			else
				# single item
				externalItem = getExternalItem(removedItem, state.fnArrays.decorators)
				emit('remove', "Removed single item",
					{id: externalItem.$id, itemCount: 1, added: Math.floor((Date.now() - externalItem.$writeTime) / 1000) + " seconds ago"}
					{item: externalItem, itemCount: 1})
				return externalItem


		removeByQuery: (query) ->
			cacheHit = null
			eventInfoCb = (type, data) ->
				if type == EVENT_INFO_TYPES.cacheHit
					cacheHit = data.cacheHit

			removedItems = storeOperations.removeByQuery(state, eventInfoCb, query)
			externalItems = removedItems.map((item) -> getExternalItem(item, state.fnArrays.decorators))

			emit('removeByQuery', 'Removed items by query',
				{itemCount: externalItems.length, cacheHit: cacheHit},
				{query: query, item: externalItems, cacheHit: cacheHit})
			return externalItems


		get: (id) ->
			returnedItem = storeOperations.get(state, (->), id)
			externalItem = getExternalItem(returnedItem, state.fnArrays.decorators)

			emit('get', 'Looked up item by ID', {id: id}, {item: externalItem})
			return externalItem


		find: (query) ->
			cacheHit = null
			eventInfoCb = (type, data) ->
				if type == EVENT_INFO_TYPES.cacheHit
					cacheHit = data.cacheHit

			foundItems = storeOperations.find(state, eventInfoCb, query, false)
			externalItems = foundItems.map((item) -> getExternalItem(item, state.fnArrays.decorators))

			emit('find', 'Querying store to find items',
				{itemCount: externalItems.length, query: stringifyQuery(query), cacheHit: cacheHit},
				{query: query, item: externalItems, cacheHit: cacheHit})
			return externalItems


		findOne: (query) ->
			cacheHit = null
			eventInfoCb = (type, data) ->
				if type == EVENT_INFO_TYPES.cacheHit
					cacheHit = data.cacheHit

			foundItem = storeOperations.findOne(state, eventInfoCb, query)
			externalItem = getExternalItem(foundItem, state.fnArrays.decorators)

			if externalItem?
				id = externalItem.$id
			else
				id = null
			emit('findOne', 'Querying store to find single item',
				{query: stringifyQuery(query), id: id, cacheHit: cacheHit},
				{query: query, item: externalItem, cacheHit: cacheHit})
			return externalItem


		count: (query) ->
			cacheHit = null
			eventInfoCb = (type, data) ->
				if type == EVENT_INFO_TYPES.cacheHit
					cacheHit = data.cacheHit

			itemCount = storeOperations.count(state, eventInfoCb, query)
			emit('count', 'Counting items matching query',
				{count: itemCount, query: stringifyQuery(query), cacheHit: cacheHit},
				{count: itemCount, query: query, cacheHit: cacheHit})
			return itemCount


		forEach: (fn) ->
			validateArguments([fn], ['function'])

			cb = (item) ->
				fn(getExternalItem(item, state.fnArrays.decorators))

			storeOperations.forEach(state, (->), cb)
			emit('forEach', 'Ran a function for each item', null, {callback: cb})
			return


		isEmpty: ->
			isEmpty = storeOperations.isEmpty(state, (->))
			emit('isEmpty', 'Checked if store is empty', {empty: isEmpty}, {empty: isEmpty})
			return isEmpty


		clear: ->
			storeOperations.clear(state, (->))
			emit('clear', 'Store cleared')
			return



		setCacheFor: (query) ->
			validateArguments([query], ['query'])
			state.structure = updateStructure.cacheQuery(state.structure, query, state.store)
			return

		setValidatorFor: (tag, fn) ->
			validateArguments(arguments, ['string', 'function'])
			if !state.fnArrays.validators[tag]?
				state.fnArrays.validators[tag] = []
			state.fnArrays.validators[tag].push(fn)
			return state.fnArrays.validators[tag].length

		setDecoratorFor: (tag, decoratorObj) ->
			{decorate, undecorate} = decoratorObj
			validateArguments(arguments, ['string', 'object'])
			if typeof decorate != 'function' || typeof undecorate != 'function'
				throw new Error('Invalid parameters')

			if !state.fnArrays.decorators[tag]?
				state.fnArrays.decorators[tag] = []
				state.fnArrays.undecorators[tag] = []
			state.fnArrays.decorators[tag].push(decorate)
			state.fnArrays.undecorators[tag].unshift(undecorate)
			return state.fnArrays.decorators[tag].length


		StorageFullError: StorageFullError

		persistentStorageAvailable: ->
			return state.store.db.isAvailable()


		getRawItem: (item) ->
			internalItem = getInternalItem(item, state.fnArrays.undecorators)
			return internalItem.item

		getMetadata: (item) ->
			internalItem = getInternalItem(item, state.fnArrays.undecorators)
			return internalItem.meta


		__on: (operationType, cb) ->
			validateArguments(arguments, ['string', 'function'])
			if !listeners[operationType]?
				listeners[operationType] = []
			listeners[operationType].push(cb)
			return


		__getStructure: ->
			return state.structure


		__dumpItem: (item) ->
			internalItem = getInternalItem(item, state.fnArrays.undecorators)

			str = ''
			if internalItem.meta.tag?
				str += "##{internalItem.meta.tag}\n"
			else
				str += 'NO_TAG'

			str += "\tstore:#{if internalItem.meta.persistent then 'persistent' else 'memory'}\n
					\twriteTime: #{Date(internalItem.meta.writeTime)} \n\t"
			return str
	}


module.exports.StorageFullError = StorageFullError