cloneValue = require('./cloneValue')

module.exports = ->
	store = {
		values: {}
		items: {}
	}

	write = (key, value, substore) ->
		substore[key] = cloneValue(value)
		return value

	read = (key, substore) ->
		value = substore[key]
		if !value? then value = null
		return cloneValue(value)

	remove = (key, substore) ->
		result = read(key, substore)
		if result?
			delete substore[key]
		return result


	return {
		clear: ->
			store.values = {}
			store.items = {}

		write: (key, value) ->
			return write(key, value, store.values)

		read: (key) ->
			return read(key, store.values)

		remove: (key) ->
			return remove(key, store.values)


		writeItem: (id, metaItem) ->
			return write(id, metaItem, store.items)

		readItem: (id) ->
			return read(id, store.items)

		removeItem: (id) ->
			return remove(id, store.items)

		readAllItems: ->
			items = []
			@forEachItem (item) ->
				items.push(item)
			return items

		forEachItem: (fn) ->
			i = 0
			for own key of store.items
				fn(read(key, store.items), i)
				i++
			return

	}