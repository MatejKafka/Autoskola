fs = require('fs')
Promise = require('promise')

capitaliseFirstLetter = (string) ->
	return string.charAt(0).toUpperCase() + string.slice(1)


fileStat = Promise.denodeify(fs.stat)
readDir = Promise.denodeify(fs.readdir)

fileExists = (path) ->
	return new Promise((fulfill, reject) ->
		fs.exists(path, (exists) ->
			if exists
				fulfill()
			else
				reject()
		)
	)

file = (filePath) ->
	return {
		is: (property) ->
			return fileStat(filePath)
			.then((stats) ->
				if stats['is' + capitaliseFirstLetter(property)]()
					return Promise.resolve()
				else
					return Promise.reject()
			)
	}



recurse = (path) ->
	return readDir(path)
	.then((fileList) ->
		if fileList.length == 0
			return []

		return new Promise((resolve) ->
			doneCounter = 0
			length = fileList.length

			nextDone = () ->
				doneCounter++
				if doneCounter == length
					resolve(result)

			result = []

			for fileName in fileList
				# filePath would change before the callback was called
				(->
					filePath = path + '/' + fileName

					file(filePath).is('directory')
					.then(->
						recurse(filePath)
						.then((files) ->
							result = result.concat(files)
							nextDone()
						)
					)

					file(filePath).is('file')
					.then(->
						result.push(filePath)
						nextDone()
					)
				)()

			return
		)
	)



module.exports = (basePath) ->
	return new Promise((resolve, reject) ->
		fileExists(basePath)
		.then(->
			recurse(basePath)
			.then(resolve, reject)
		, ->
			resolve([])
		)
	)