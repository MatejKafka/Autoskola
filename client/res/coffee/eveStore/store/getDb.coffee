localStorageSupported = require('./localStorageSupported')
isQuotaExceededError = require('./isQuotaExceededError')
cloneValue = require('./cloneValue')

module.exports = (storageNamespace) ->
	getKey = (key, isItem) ->
		if isItem
			key = 'items/' + key
		return storageNamespace + '/' + key

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
		for i in [0...localStorage.length]
			key = localStorage.key(i)
			if key.indexOf(getKey('', false)) == 0
				recordCache[key] = JSON.parse(localStorage.getItem(key))

	return {
		isAvailable: -> isAvailable

		clear: ->
			validateLocalStorage()
			for key of recordCache
				localStorage.removeItem(key)
			return


		write: (key, value, isItem = false) ->
			validateLocalStorage()
			key = getKey(key, isItem)
			try
				localStorage.setItem(key, JSON.stringify(value))
			catch err
				if isQuotaExceededError(err)
					throw new Error("Persistent storage is full, cannot write to #{key}")
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