BASE_API_URL = '/api/'

require('whatwg-fetch')

getQuery = (id) ->
	if !id?
		return ''
	if Array.isArray(id)
		return '?id=' + encodeURIComponent(id.join(','))
	else
		return '?id=' + encodeURIComponent(id)

getResource = (id = null, resourceName = '') ->
	queryStr = getQuery(id)
	url = BASE_API_URL + resourceName + queryStr

	fetch(url)
	.then (response) ->
		if !response.ok
			throw new Error('Invalid status code returned from API: ' + response.status)
		return response.json()


module.exports =
	getSection: (id = null) ->
		return getResource(id, 'getSection')

	getQuestion: (id = null) ->
		return getResource(id, 'getQuestion')