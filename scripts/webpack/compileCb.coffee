chalk = require('chalk')


module.exports = (err, stats) ->
	if err?
		console.error(chalk.redBright('ERROR OCCURRED WHILE COMPILING CLIENT'))
		console.error(chalk.redBright(err.stack || err))
		if err.details?
			console.error(chalk.redBright(err.details))
		return 1

	json = stats.toJson({errors: true, warnings: true})

	if stats.hasErrors()
		console.error(chalk.redBright(json.errors))
		return 1

	if stats.hasWarnings()
		console.warn(chalk.yellowBright('WARNINGS:'))
		console.warn(chalk.yellowBright(json))
		return 0

	console.log(stats.toString('normal'))
	console.log(chalk.green('SUCCESSFULLY COMPILED'))
	return 0