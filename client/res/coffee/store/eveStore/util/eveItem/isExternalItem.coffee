metaSymbol = require('../../METADATA_SYMBOL')

module.exports = (item) ->
	return item? && typeof item == 'object' && item[metaSymbol]?