chalk = require('chalk')

# Node still doesn't throw on unhandled promises, we gotta do everything ourselves...
process.on 'unhandledRejection', (err) ->
	console.error(chalk.red('UNHANDLED PROMISE REJECTION:'))
	console.error(chalk.red(err.stack))
	process.exit(1)