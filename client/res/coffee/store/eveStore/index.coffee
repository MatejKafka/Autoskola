StorageFullError = require('./store/StorageFullError')

getDb = require('./store/getDb')
getMemoryStore = require('./store/getMemoryStore')

itemOperations = require('./operations/index')

generateStructure = require('./structure/generateStructure')
updateStructure = require('./structure/updateStructure')
getClearStructure = require('./structure/getClearStructure')

applyFnArray = require('./applyFnArray')
cloneValue = require('./store/cloneValue')

isItemWithMeta = (item) ->
	return item? && typeof item == 'object' && item[metaSymbol]?

raw_separateStoreItem = require('./separateStoreItem')
separateStoreItem = (storeItem) ->
	return raw_separateStoreItem(storeItem, metaSymbol)

raw_rewriteInternalItem = require('./rewriteInternalItem')
rewriteInternalItem = (internalItem) ->
	return raw_rewriteInternalItem(internalItem, metaSymbol)

raw_validateStoreItem = require('./validateStoreItem')
validateItemWithMeta = (item) ->
	return raw_validateStoreItem(item, metaSymbol)


ALREADY_LOADED_NAMESPACES = []
metaSymbol = Symbol('eveStore metadata')


module.exports = (storeNamespace) ->
	if ALREADY_LOADED_NAMESPACES.indexOf(storeNamespace) > -1
		throw new Error('eveStore instance already loaded for this namespace - only one instance for each namespace is allowed')
	ALREADY_LOADED_NAMESPACES.push(storeNamespace)

	store =
		db: getDb(storeNamespace)
		memory: getMemoryStore()

	structure = generateStructure(store)

	validators = {}
	decorators = {}
	undecorators = {}

	listeners = {}
	emit = (opType, message, data) ->
		if listeners[opType]?
			for cb in listeners[opType]
				cb(message, data, opType)
		if listeners['*']?
			for cb in listeners['*']
				cb(message, data, opType)
		return

	# TODO: rewrite, big mess
	return eve = {
		add: (tag, persist, item) ->
			if arguments.length == 1
				item = tag
				persist = null
				tag = null

			else if arguments.length == 2
				item = persist
				if typeof tag == 'boolean'
					persist = tag
					tag = null
				else
					persist = null

			if typeof item != 'object'
				throw new Error('item must be object, not ' + typeof item)

			if isItemWithMeta(item)
				console.warn('to update item, use store.update, not store.add')
				throw new Error('store.add does not accept already inserted item - use store.update for changes')

			if tag?
				try
					applyFnArray(item, validators[tag], true, false)
				catch err
					console.warn("validation failed - tag: #{tag}", item)
					throw err

			returnedItem = itemOperations.add({
				item: item
				meta: {tag: tag, persistent: persist}
				isExisting: false
			}, store, structure)

			structure = updateStructure.add(structure, returnedItem, store)
			rewrittenItem = rewriteInternalItem(returnedItem)
			if returnedItem.meta.tag?
				rewrittenItem = applyFnArray(rewrittenItem, decorators[returnedItem.meta.tag], null, true)
			emit('add', "Added new item to `#{storeNamespace}` (id: #{returnedItem.meta.id})", rewrittenItem)
			return rewrittenItem


		update: (item) ->
			validateItemWithMeta(item)

			tag = item[metaSymbol].tag
			if tag?
				item = applyFnArray(item, undecorators[tag], null, true)
				try
					applyFnArray(item, validators[tag], false, false)
				catch err
					console.warn("validation failed - tag: #{tag}", item)
					throw err

			separatedItem = separateStoreItem(item)
			separatedItem.isExisting = true

			itemOperations.remove(separatedItem, store, structure)
			returnedItem = itemOperations.add(separatedItem, store, structure)
			structure = updateStructure.change(structure, returnedItem, store)
			rewrittenItem = rewriteInternalItem(returnedItem)

			if returnedItem.meta.tag?
				rewrittenItem = applyFnArray(rewrittenItem, decorators[returnedItem.meta.tag], null, true)

			emit('update', "Updated item (id: #{returnedItem.meta.id})", rewrittenItem)
			return rewrittenItem


		remove: (itemOrId, __isInternal = false) ->
			if Array.isArray(itemOrId)
				removedItems = for item in itemOrId
					eve.remove(item, __isInternal)
				return removedItems

			if typeof itemOrId != 'number' && !__isInternal
				validateItemWithMeta(itemOrId)
				itemOrId = separateStoreItem(itemOrId)

			removedItem = itemOperations.remove(itemOrId, store, structure)
			if removedItem?
				structure = updateStructure.remove(structure, removedItem, store)
			rewrittenItem = rewriteInternalItem(removedItem)

			if removedItem.meta.tag?
				rewrittenItem = applyFnArray(rewrittenItem, decorators[removedItem.meta.tag], null, true)

			if !__isInternal
				if removedItem?
					emit('remove',
						"Removed item from `#{storeNamespace}` (id: #{removedItem.meta.id},
							added #{Math.floor((Date.now() - removedItem.meta.writeTime) / 1000)} seconds ago)",
						rewrittenItem)
				else
					emit('remove', "Attempted to remove missing item
							(id: #{if typeof itemOrId == 'number' then itemOrId else itemOrId.meta.id})",
						null)

			return rewrittenItem


		removeByQuery: (query) ->
			unfilteredResult = eve.find(query, true)
				.map((item) => eve.remove(item, true))
			result = unfilteredResult.filter((item) -> item?)

			emit('removeByQuery', "Removed items by query
					(removedItemCount: #{result.length}, foundItemCount: #{unfilteredResult.length})",
				{query: query, foundItemCount: unfilteredResult.length, removedItemCount: result.length})

			return result


		get: (id) ->
			returnedItem = itemOperations.get(id, store, structure)
			rewrittenItem = rewriteInternalItem(returnedItem)
			if returnedItem.meta.tag?
				rewrittenItem = applyFnArray(rewrittenItem, decorators[returnedItem.meta.tag], null, true)
			emit('get', "Looked up item by ID (id: #{id})", rewrittenItem)
			return rewrittenItem


		find: (query, __isInternal = false, __singleRecord = false) ->
			rawItems = itemOperations.find(query, store, structure, __singleRecord)
				.filter((i) -> i?)

			if __isInternal
				items = rawItems
			else
				items = for item in rawItems
					rewrittenItem = rewriteInternalItem(item)
					if item.meta.tag?
						applyFnArray(rewrittenItem, decorators[item.meta.tag], null, true)
					else
						rewrittenItem

			if !__isInternal
				emit('find', "Querying store to find items (itemCount: #{rawItems.length})", {query: query, itemCount: rawItems.length})

			return items


		findOne: (query) ->
			result = eve.find(query, null, true)[0]
			if !result?
				result = null
			return result


		count: (query) ->
			return itemOperations.count(query, store, structure)


		forEach: (fn) ->
			cb = (item) ->
				if item.meta.tag?
					fn(applyFnArray(rewriteInternalItem(item), decorators[item.meta.tag], null, true))
				else
					fn(rewriteInternalItem(item))
			store.db.forEachItem(cb)
			store.memory.forEachItem(cb)
			return


		isEmpty: ->
			return store.db.isEmpty() && store.memory.isEmpty()


		clear: ->
			store.db.clear()
			store.memory.clear()
			structure = getClearStructure()
			emit('clear', 'Store cleared')
			return



		setCacheFor: (query) ->
			if typeof query != 'object'
				throw new Error('Invalid parameters')
			structure = updateStructure.cacheQuery(structure, query, store)
			return

		setValidatorFor: (tag, fn) ->
			if typeof tag != 'string' || typeof fn != 'function'
				throw new Error('Invalid parameters')
			if !validators[tag]?
				validators[tag] = []
			validators[tag].push(fn)
			return validators[tag].length

		setDecoratorFor: (tag, decoratorObj) ->
			{decorate, undecorate} = decoratorObj
			if typeof tag != 'string' || typeof decorate != 'function' || typeof undecorate != 'function'
				throw new Error('Invalid parameters')

			if !decorators[tag]?
				decorators[tag] = []
				undecorators[tag] = []
			decorators[tag].push(decorate)
			undecorators[tag].unshift(undecorate)
			return decorators[tag].length


		StorageFullError: StorageFullError

		persistentStorageAvailable: ->
			return store.db.isAvailable()


		getRawItem: (item) ->
			validateItemWithMeta(item)
			return separateStoreItem(item).item

		getMetadata: (item) ->
			validateItemWithMeta(item)
			return separateStoreItem(item).meta


		__on: (operationType, cb) ->
			if !listeners[operationType]?
				listeners[operationType] = []
			listeners[operationType].push(cb)
			return


		__getStructure: ->
			return cloneValue(structure)


		__dumpItem: (item) ->
			validateItemWithMeta(item)
			item = separateStoreItem(item)

			str = ''
			if item.meta.tag?
				str += "##{item.meta.tag}\n"
			else
				str += 'NO_TAG'

			str += "\tstore:#{if item.meta.persistent then 'persistent' else 'memory'}\n
					\twriteTime: #{Date(item.meta.writeTime)} \n\t"

			console.log(str, item.item)
			return str
	}


module.exports.StorageFullError = StorageFullError