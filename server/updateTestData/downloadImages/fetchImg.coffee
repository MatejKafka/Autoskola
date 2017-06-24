request = require('request')


module.exports = (url) ->
	return new Promise (resolve, reject) ->
		request {url: url, encoding: null}, (err, response, body) ->
			if err?
				return reject(err)
			resolve(body)