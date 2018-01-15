rewriteInternalItem = require('./rewriteInternalItem')
decorateItem = require('./decorateItem')

module.exports = (internalItem, decorators) ->
	if !internalItem?
		return null
	return decorateItem(rewriteInternalItem(internalItem), internalItem.meta.tag, decorators)