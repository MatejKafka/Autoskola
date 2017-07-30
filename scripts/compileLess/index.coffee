PATHS = require('./../PATHS')
path = require('path')
fs = require('fs-extra')
less = require('less')
LessPluginAutoPrefix = require('less-plugin-autoprefix')


sourcePath = path.resolve(PATHS.CLIENT, './res/less/index.less')
targetPath = path.resolve(PATHS.CLIENT, './res/css/index.css')

lessSrc = fs.readFileSync(sourcePath, 'utf8')

less.render(lessSrc, {
	plugins: [
		new LessPluginAutoPrefix({browsers: '>1%'})
	]
	filename: sourcePath
})
.catch (err) ->
	console.error('ERROR OCCURRED WHILE COMPILING LESS STYLESHEETS')
	console.error(err)
	process.exit(1)

.then (output) ->
	fs.outputFileSync(targetPath, output.css)
	console.log('CSS BUNDLE SUCCESSFULLY BUILT')