applyFnArray = require('../applyFnArray')

module.exports = (externalItem, tag, validators) ->
	if tag?
		try
			applyFnArray(externalItem, validators[tag], true, false)
		catch err
			console.warn("validation failed - tag: #{tag}", externalItem)
			throw err
	return