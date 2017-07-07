request = require('request-promise-native')
url = require('url')


processUrl = (uri) ->
	u = url.parse(uri)
	# deprecated, but it seems like the only way to encode url as latin1 (source server is old as fuck and doesn't support unicode)
	u.pathname = escape(decodeURIComponent(u.pathname))
	return url.format(u)


module.exports = (imgUrl) ->
	uri = processUrl(imgUrl)

	request({
		url: uri
		encoding: null
		resolveWithFullResponse: true
	})
	.then (response) ->
		if response.statusCode != 200
			throw new Error("invalid statusCode in fetchImg: #{response.statusCode} (url: #{uri})")

		if response.body.length == 0
			# source server is retarded - when img is missing, it sends 200 with empty body
			throw new Error("requested image is missing: #{uri}")

		return response.body