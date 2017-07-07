chalk = require('chalk')

module.exports =
	logStart: (description) ->
		console.info(chalk.green('\n' + description.toUpperCase()))

	logEnd: (description) ->
		console.info(chalk.green('FINISHED ' + description.toUpperCase()))

	throwError: (err, description) ->
		console.error('\n')
		console.error(chalk.red.bold('ERROR OCCURRED WHILE ' + description.toUpperCase()))
		console.error(chalk.red.bold(err.stack))
		process.exit(1)
