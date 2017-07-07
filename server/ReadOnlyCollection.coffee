module.exports = class ReadOnlyCollection
	constructor: (@items, @lastChange) ->
		@__defineGetter__('length', => @items.length)
		@_idCache = {}
		for item in @items
			@_idCache[item.id] = item

	get: (id) ->
		if !id?
			return @items
		if @_idCache[id]?
			return @_idCache[id]
		return null

	filter: (fn) ->
		return new ReadOnlyCollection(@getFiltered(fn))

	getFiltered: (fn) ->
		return @items.filter(fn)

	forEach: (fn) ->
		@items.forEach(fn)
		return

	map: (fn) ->
		return new ReadOnlyCollection(@getMapped(fn))

	getMapped: (fn) ->
		return @items.map(fn)