cp = require('child_process')

module.exports = (modulePath) ->
	result = cp.spawnSync('node', [modulePath])

	if result.status != 0
		if result.stderr.slice(-1) == '\n'
			result.stderr = result.stderr.slice(0, -1)
		console.error('Error while running script: ' + modulePath)
		console.error(result.stderr)
		process.exit(1)
	return