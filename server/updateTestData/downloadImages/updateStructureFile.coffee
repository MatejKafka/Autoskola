fs = require('fs')
path = require('path')

module.exports = (targetDir) ->
	console.log('UPDATING /structure.json')

	topLevelStructure = []
	for dirName in fs.readdirSync(targetDir)
		dirPath = path.resolve(targetDir, dirName)
		stat = fs.lstatSync(dirPath)
		if !stat.isDirectory()
			continue

		try
			topLevelStructure.push(require(path.resolve(dirPath, 'structure.json')))
		catch err
			console.warn('structure.json is missing in ' + dirPath)

	fs.writeFileSync(path.resolve(targetDir, 'structure.json'), JSON.stringify(topLevelStructure))
	console.log('UPDATED /structure.json (' + topLevelStructure.length + ' question folders)')

	return topLevelStructure