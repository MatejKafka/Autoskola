localStorageSupported = require('./localStorageSupported')
isQuotaExceededError = require('./isQuotaExceededError')
cloneValue = require('../util/cloneValue')
StorageFullError = require('./StorageFullError')
isEmptyObj = require('../util/isEmptyObj')


module.exports = (storageNamespace) ->
	getKey = (key, isItem) ->
		prefix = if isItem == true then 'items/' else if isItem == false then 'values/' else ''
		return "#{storageNamespace}/#{prefix}#{key}"

	isItemKey = (key) ->
		return key.indexOf(getKey('', true)) == 0

	isAvailable = localStorageSupported()
	validateLocalStorage = ->
		if !isAvailable
			throw new Error('Persistent storage is not supported by the browser')

	recordCache = {}
	if !isAvailable
		console.warn('Persistent storage is not supported by the browser')
	else
		baseKey = getKey('', null)
		for i in [0...localStorage.length]
			key = localStorage.key(i)
			if key.indexOf(baseKey) == 0
				recordCache[key] = JSON.parse(localStorage.getItem(key))

	return {
		isAvailable: -> isAvailable

		isEmpty: ->
			return isEmptyObj(recordCache)

		clear: ->
			validateLocalStorage()
			for key of recordCache
				localStorage.removeItem(key)
			recordCache = {}
			return


		write: (key, value, isItem = false) ->
			validateLocalStorage()
			key = getKey(key, isItem)
			try
				localStorage.setItem(key, JSON.stringify(value))
			catch err
				if isQuotaExceededError(err)
					throw new StorageFullError("Persistent storage is full, cannot write to #{key}")
				throw err
			recordCache[key] = cloneValue(value)
			return


		read: (key, isItem = false) ->
			validateLocalStorage()
			key = getKey(key, isItem)
			value = recordCache[key]
			if !value?
				return null
			else
				return cloneValue(value)


		remove: (key, isItem = false) ->
			validateLocalStorage()
			record = @read(key, isItem)
			if record?
				key = getKey(key, isItem)
				localStorage.removeItem(key)
				delete recordCache[key]
			return record



		writeItem: (id, metaItem) ->
			return @write(id, metaItem, true)

		readItem: (id) ->
			return @read(id, true)

		removeItem: (id) ->
			return @remove(id, true)



		readFirstItem: ->
			validateLocalStorage()
			for key, item in recordCache
				if key.indexOf(getKey('', true)) == 0
					return item
			return null


		readAllItems: ->
			validateLocalStorage()
			items = []
			for own key, value of recordCache
				if isItemKey(key)
					items.push(value)
			return items


		forEachItem: (fn) ->
			validateLocalStorage()
			index = 0
			for own key, value of recordCache
				if isItemKey(key)
					fn(cloneValue(value), index)
					index++
			return
	}