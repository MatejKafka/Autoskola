BASE_API_URL = '/api/'

require('whatwg-fetch')
qs = require('querystring')


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


getResource = (id = null, resourceName = '', sinceInMs) ->
	queryStr = getQuery(id, sinceInMs)
	url = BASE_API_URL + resourceName + queryStr

	fetch(url)
	.then (response) ->
		if !response.ok
			throw new Error('Invalid status code returned from API: ' + response.status)
		return response.json()


module.exports =
	getSection: (id = null, since = null) ->
		return getResource(id, 'getSection', since)

	getQuestion: (id = null, since = null) ->
		return getResource(id, 'getQuestion', since, {withRemoteImg: false})