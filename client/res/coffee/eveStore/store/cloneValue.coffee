cloneValue = (value) ->
	out = {}
	for own key, propValue of value
		if propValue == null ||typeof propValue != 'object'
			out[key] = propValue
		else
			out[key] = cloneValue(propValue)
	return out


module.exports = (value) ->
	if typeof value != 'object' || value == null
		return value

	return cloneValue(value)