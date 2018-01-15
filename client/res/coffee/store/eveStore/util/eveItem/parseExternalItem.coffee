metaSymbol = require('../../METADATA_SYMBOL')

module.exports = (externalItem) ->
	meta = externalItem[metaSymbol]
	if !meta?
		meta = {}

	item = {}
	for key, value of externalItem
		if key[0] == '$' && meta.hasOwnProperty(key.slice(1))
			continue
		item[key] = value

	return {
		item: item
		meta: meta
	}