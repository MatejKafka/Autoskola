objShallowEqual = (obj1, obj2) ->
	keys1 = Object.keys(obj1)
	keys2 = Object.keys(obj2)

	for key1 in keys1
		if keys2.indexOf(key1) < 0
			return false
		if obj1[keys1] != obj2[keys1]
			return false

	for key2 in keys2
		if keys1.indexOf(key2) < 0
			return false
	return true


parseQueryString = (queryStr) ->
	if !queryStr?
		return {}
	params = {}
	pairs = queryStr.split('&')
	for pair in pairs
		[key, value] = pair.split('=')
		params[decodeURIComponent(key)] = decodeValue(value)
	return params


parseHash = (hashStr) ->
	[pageName, paramStr] = hashStr.split('?')
	return {
		page: pageName
		params: parseQueryString(paramStr)
	}


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


generateHash = (pageName, params) ->
	if !params? || Object.keys(params).length == 0
		return pageName
	queryPairs = for key, value of params
		encodeURIComponent(key) + '=' + encodeValue(value)
	return pageName + '?' + queryPairs.join('&')


gotoPage = (pageName, params) ->
	window.location.hash = generateHash(pageName, params)
	return


updateView = (container, screens, newHash) ->
	{page, params} = parseHash(newHash)

	if !screens[page]?
		return null

	window.scrollTo(0, 0)
	container.innerHTML = ''
	screens[page](container, gotoPage, params)
	return true


getHash = ->
	return window.location.hash.slice(1)


module.exports = (container, screens, defaultScreen) ->
	window.onhashchange = ->
		if getHash() != ''
			updateView(container, screens, getHash())
		else
			updateView(container, screens, defaultScreen)

	if getHash() != ''
		if updateView(container, screens, getHash())
			return

	updateView(container, screens, defaultScreen)
	return