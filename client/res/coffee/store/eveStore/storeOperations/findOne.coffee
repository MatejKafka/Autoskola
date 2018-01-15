findItems = require('./find')


module.exports = (state, query) ->
	foundItem = findItems(state, query, true)[0]
	if !foundItem?
		foundItem = null

	return foundItem