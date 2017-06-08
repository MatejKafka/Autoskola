typeOf = (variable) ->
	if variable == null
		return 'null'
	if Array.isArray(variable)
		return 'array'
	return typeof variable


renderOrArray = (arr) ->
	if arr.length == 1
		return arr[0]
	lastItem = arr.slice(-1)
	return arr.slice(0, -1).join(', ') + ' or ' + lastItem


window.validateObjStructure = module.exports = (obj, template) ->
	for name, expectedTypeStr of template
		realType = typeOf(obj[name])

		expectedTypes = expectedTypeStr.split('|')
			.map((s) -> s.trim())
			.filter((s) -> s != '')

		matches = false
		for type in expectedTypes
			if type == 'optimizedArray'
				if obj[name] == '*' || Array.isArray(obj[name])
					matches = true
					break
			else
				if realType == type
					matches = true
					break

		if !matches
			throw new Error('Invalid property type: ' + name + ' should be (' + renderOrArray(expectedTypes) + '), not (' + realType + ')')
	return true