testObj = (obj, template) ->
	if typeof obj != 'object'
		return false

	for key, value of template
		if typeof value == 'function'
			if !value(obj[key])
				return false
		else if typeof value == 'object'
			if !testObj(obj[key], value)
				return false
		else
			if obj[key] != value
				return false
	return true


module.exports = (item, itemQuery, metaQuery) ->
	return testObj(item.item, itemQuery) &&
		testObj(item.meta, metaQuery)


module.exports.testObj = testObj