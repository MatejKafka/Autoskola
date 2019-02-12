findItem = require('./find')
removeItem = require('./remove')
validate = require('../typeValidator')


module.exports = (state, eventInfoCb, query) ->
	validate([eventInfoCb], ['function'])

	unfilteredResult = findItem(state, eventInfoCb, query)
		.map((item) => removeItem(state, eventInfoCb, item, true))
	return unfilteredResult.filter((item) -> item?)