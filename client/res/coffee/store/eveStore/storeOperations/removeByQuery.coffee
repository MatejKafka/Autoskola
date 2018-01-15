findItem = require('./find')
removeItem = require('./remove')


module.exports = (state, query) ->
	unfilteredResult = findItem(state, query)
		.map((item) => removeItem(state, item, true))
	return unfilteredResult.filter((item) -> item?)