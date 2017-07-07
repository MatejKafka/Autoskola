fs = require('fs')
Promise = require('promise')

module.exports = {
	read: Promise.denodeify(fs.readFile)
	write: Promise.denodeify(fs.writeFile)
	exists: (path) ->
		return new Promise((fulfill, reject) ->
			fs.exists(path, (exists) ->
				if exists
					fulfill()
				else
					reject()
			)
		)
}