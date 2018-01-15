metaSymbol = require('../../METADATA_SYMBOL')
validateArguments = require('../../typeValidator')
decorateItem = require('./decorateItem')
runItemValidators = require('./runItemValidators')
parseExternalItem = require('./parseExternalItem')

getExternalItemTag = (externalItem) ->
	return externalItem[metaSymbol].tag


module.exports = (externalItem, undecorators = null, validators = null) ->
	validateArguments(arguments, ['externalItem'])

	tag = getExternalItemTag(externalItem)
	if undecorators?
		externalItem = decorateItem(externalItem, tag, undecorators)
	if validators?
		runItemValidators(externalItem, tag, validators)
	return parseExternalItem(externalItem)