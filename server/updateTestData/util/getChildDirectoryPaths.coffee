fs = require('fs')
path = require('path')


module.exports = (parentDir) ->
	paths = []
	for dirName in fs.readdirSync(parentDir)
		dirPath = path.resolve(parentDir, dirName)
		stat = fs.lstatSync(dirPath)
		if stat.isDirectory()
			paths.push(dirPath)

	return paths
