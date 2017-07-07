fs = require('fs-extra')
path = require('path')
chalk = require('chalk')
getQuestionStructures = require('./util/getQuestionStructures')


module.exports = (targetDir) ->
	console.log(chalk.green('UPDATING /structure.json'))

	topLevelStructure = getQuestionStructures(targetDir)

	fs.writeFileSync(path.resolve(targetDir, 'structure.json'), JSON.stringify(topLevelStructure))
	console.log(chalk.green("UPDATED /structure.json (#{topLevelStructure.length} question folders)"))

	return topLevelStructure