webpack = require('webpack')
compileCb = require('./compileCb')


getConfig = require('./webpack.config')

compiler = webpack(getConfig())


compiler.watch {}, (err, stats) ->
	compileCb(err, stats)
	return