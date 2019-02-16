webpack = require('webpack')
compileCb = require('./compileCb')


getConfig = require('./webpack.config')

webpack getConfig(true), (err, stats) ->
	outputCode = compileCb(err, stats)
	process.exit(outputCode)