cloneValue = (value) ->
	if value == null || typeof value != 'object'
		return value

	if Array.isArray(value)
		out = for item in value
			cloneValue(item)
	else
		out = {}
		for own key, propValue of value
			out[key] = cloneValue(propValue)
	return out


module.exports = cloneValue