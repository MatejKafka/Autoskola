getArgumentValidator = require('../../validateArguments').getScope
isExternalItem = require('./util/eveItem/isExternalItem')
isInternalItem = require('./util/eveItem/isInternalItem')


validator = getArgumentValidator()
validator.addType('id', (arg) -> @int(arg) && arg >= 0)
validator.addType('externalItem', isExternalItem)
validator.addType('internalItem', isInternalItem)

validator.addType 'query', (arg) ->
	return @int(arg) || @string(arg) || @object(arg) || @null(arg)

validator.addType('item_tag', (arg) -> @string(arg) || @null(arg))
validator.addType('item_persistent', (arg) -> @boolean(arg))


module.exports = validator