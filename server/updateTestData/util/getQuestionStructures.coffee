path = require('path')
getChildDirectoryPaths = require('./getChildDirectoryPaths')

module.exports = (targetDir) ->
	structures = []
	for dirPath in getChildDirectoryPaths(targetDir)
		try
			structures.push(require(path.resolve(dirPath, 'structure.json')))
		catch err
			console.warn('structure.json is missing in ' + dirPath)

	return structures