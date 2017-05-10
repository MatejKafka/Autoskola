encodeValue = (value) ->
	if Array.isArray(value)
		return 'a:[' + value.map(encodeValue).join(',') + ']'
	else if typeof value == 'object'
		return 'o:' + encodeURIComponent(JSON.stringify(value))
	else if typeof value == 'number'
		return 'n:' + value
	else if typeof value == 'boolean'
		return 'b:' + (if value then 1 else 0)
	else if typeof value == 'string'
		return 's:' + encodeURIComponent(value)
	else
		return 'g:' + encodeURIComponent(value)


decodeValue = (value) ->
	valueType = value.slice(0, 1)
	valueStr = value.slice(2)

	switch valueType
		when 'a'
			return valueStr.slice(1, -1).split(',').map(decodeValue)
		when 'o'
			return JSON.parse(decodeURIComponent(valueStr))
		when 'n'
			return parseFloat(valueStr)
		when 'b'
			return Boolean(parseInt(valueStr))
		when 's', 'g'
			return decodeURIComponent(valueStr)
		else
			console.warn('Incorrect format for value in hash: ' + value)
			return decodeURIComponent(value)


parseTypeQueryString = (queryStr) ->
	if !queryStr?
		return {}
	params = {}
	pairs = queryStr.split('&')
	for pair in pairs
		[key, value] = pair.split('=')
		params[decodeURIComponent(key)] = decodeValue(value)
	return params

			

module.exports =
	parse: (hashStr) ->
		[pageName, paramStr] = hashStr.split('?')
		return {
			page: pageName
			params: parseTypeQueryString(paramStr)
		}

	generate: (pageName, params) ->
		if !params? || Object.keys(params).length == 0
			return pageName
		queryPairs = for key, value of params
			encodeURIComponent(key) + '=' + encodeValue(value)
		return pageName + '?' + queryPairs.join('&')