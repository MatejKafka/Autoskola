BASE_API_URL = '/api/'

require('whatwg-fetch')
qs = require('querystring')


getOptions = (since) ->
	return {
		method: 'GET'
		cache: 'no-cache'
		cors: 'cors'
		headers: new Headers({
			#'If-None-Match': ''
		})
	}


getQuery = (id, since, queryBase = null) ->
	queryObj = Object.assign({}, queryBase)

	if since?
		queryObj.since = Math.floor(since / 1000)
	if id?
		if Array.isArray(id)
			queryObj.id = id.join(',')
		else
			queryObj.id = id

	queryStr = qs.stringify(queryObj)
	if queryStr != ''
		queryStr = '?' + queryStr
	return queryStr


getHeaders = (headerObj) ->
	iterator = headerObj.entries()
	headers = {}
	loop
		header = iterator.next()
		if header.done
			return headers
		headers[header.value[0]] = header.value[1]


getResource = (id = null, resourceName = '', sinceInMs) ->
	queryStr = getQuery(id, sinceInMs)
	url = BASE_API_URL + resourceName + queryStr

	fetch(url, getOptions(sinceInMs))
	.then (response) ->
		if response.status == 304
			return null
		if !response.ok
			throw new Error('Invalid status code returned from API: ' + response.status)
		return response.json()
			.catch -> throw new Error('Could not parse API response')


module.exports =
	getSection: (id = null, since = null) ->
		return getResource(id, 'getSection', since)

	getQuestion: (id = null, since = null) ->
		return getResource(id, 'getQuestion', since, {withRemoteImg: false})