applyFnArray = require('../applyFnArray')

module.exports = (externalItem, tag, decorators) ->
	if !externalItem?
		return null

	if tag?
		return applyFnArray(externalItem, decorators[tag], null, true)
	return externalItem