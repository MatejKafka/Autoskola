metaSymbol = require('../../METADATA_SYMBOL')
validateArguments = require('../../typeValidator')

# TODO: test, might be a memory leak
module.exports = (internalItem) ->
	if !internalItem?
		return null
	{item, meta} = internalItem
	item[metaSymbol] = meta

	for key of meta
		do (key) ->
			item.__defineGetter__('$' + key, -> @[metaSymbol][key])

			# only tag and persistent attributes are mutable
			item.__defineSetter__ '$tag', (newValue) ->
				validateArguments([newValue], ['item_tag'])
				@[metaSymbol].tag = newValue

			item.__defineSetter__ '$persistent', (newValue) ->
				validateArguments([newValue], ['item_persistent'])
				@[metaSymbol].persistent = newValue


	return item