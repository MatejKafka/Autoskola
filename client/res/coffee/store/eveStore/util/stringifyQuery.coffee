module.exports = (queryObj) ->
	if typeof queryObj == 'string'
		queryStr = "($tag: #{queryObj})"
	else if typeof queryObj == 'number'
		queryStr = '#' + queryObj
	else
		queryStr = Object.entries(queryObj)
			.map(([key, value]) -> key + ': ' + value)
			.join(', ')
		queryStr = '(' + queryStr + ')'

	return queryStr