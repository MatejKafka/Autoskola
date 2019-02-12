findItems = require('./find')
validateArguments = require('../typeValidator')


module.exports = (state, eventInfoCb, query) ->
	validateArguments([query, eventInfoCb], ['query', 'function'])

	foundItem = findItems(state, eventInfoCb, query, true)[0]
	if !foundItem?
		foundItem = null

	return foundItem