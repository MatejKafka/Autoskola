fs = require('fs')
path = require('path')
cp = require('child_process')

try
	chalk = require('chalk')
catch
	# not installed
	try
		cp.spawnSync('npm', ['install'], {cwd: __dirname})
		chalk = require('chalk')
	catch
		console.log('COLORS DISABLED - `chalk` NOT INSTALLED')
		noop = (arg) -> return arg
		chalk =
			redBright: noop
			yellow: noop
			green: noop


getPossibleDirs = (dir, ignoreDottedDirs = true) ->
	files = fs.readdirSync(dir)
	out = []
	for fileName in files
		if fileName != 'node_modules' && fs.statSync(path.resolve(dir, fileName)).isDirectory()
			if ignoreDottedDirs && fileName[0] == '.'
				continue
			out.push(fileName)
	return out


installInDir = (dir, relPath, env) ->
	envVar = process.env
	switch env
		when 'dev', 'development'
			envVar.NODE_ENV = 'development'
		when 'prod', 'production'
			envVar.NODE_ENV = 'production'
		when null, undefined
		else
			throw new Error("Invalid `env` value: #{env}")
	result = cp.spawnSync('npm', ['install'], {
		shell: true
		cwd: dir
		env: envVar
		encoding: 'utf8'
	})
	if result.status != 0
		if result.stderr.slice(-1) == '\n'
			result.stderr = result.stderr.slice(0, -1)
		console.error(chalk.redBright("Error occurred while installing modules in #{relPath.replace(/\\/g, '/')} (absolute: #{dir.replace(/\\/g, '/')}):"))
		console.error(chalk.redBright('\t' + result.stderr.replace(/\n/g, '\n\t')))
	else
		if result.stderr.length > 0
			if result.stderr.slice(-1) == '\n'
				result.stderr = result.stderr.slice(0, -1)
			console.warn(chalk.yellow('Following problems with your package.json were found: '))
			console.warn(chalk.yellow('\t' + result.stderr.replace(/\n/g, '\n\t')))
		console.log(chalk.green("Successfully installed modules in #{relPath.replace(/\\/g, '/')} (absolute: #{dir.replace(/\\/g, '/')})"))
	console.log('')
	return


installNestedModules = (dir, env = null, ignoreDottedDirs = true, topLevelDir = null, installInCurrentDir = false) ->
	if !topLevelDir
		topLevelDir = dir

	if installInCurrentDir && fs.existsSync(path.resolve(dir, 'package.json'))
		relPath = './' + path.relative(topLevelDir, dir)
		console.log(chalk.green("Installing in #{relPath.replace(/\\/g, '/')} (absolute: #{dir.replace(/\\/g, '/')})"))
		installInDir(dir, relPath, env)

	subdirs = getPossibleDirs(dir, ignoreDottedDirs)
	for subdir in subdirs
		installNestedModules(path.resolve(dir, subdir), env, ignoreDottedDirs, topLevelDir, true)
	return


module.exports = (rootDir, options) ->
	if typeof options != 'object'
		options = {}
	{env, ignoreDottedDirs, installInRootDir} = options
	installNestedModules(rootDir, env, ignoreDottedDirs, null, installInRootDir)
	return


if require.main == module
	# called from command line / shell
	args = process.argv.slice(2)
	contains = (param) ->
		return args.indexOf('--' + param) >= 0

	ignoreDottedFiles = !contains('readDottedFiles')
	installInRootDir = contains('installRoot')

	if contains('dev') || contains('development')
		env = 'development'
	else if contains('prod') || contains('production')
		env = 'production'
	else
		env = null

	installNestedModules(path.resolve(), env, ignoreDottedFiles, null, installInRootDir)