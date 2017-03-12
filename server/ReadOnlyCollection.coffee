module.exports = class ReadOnlyCollection
	constructor: (@items) ->
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