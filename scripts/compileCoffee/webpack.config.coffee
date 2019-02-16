path = require('path')
BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


CLIENT_RES_PATH = path.resolve(__dirname, '../../client/res')

module.exports = ->
	return {
		mode: 'production'

		#mode: 'development'
		#plugins: [new BundleAnalyzerPlugin()]


		entry: path.resolve(CLIENT_RES_PATH, './coffee/index.coffee')
		output:
			path: path.resolve(CLIENT_RES_PATH, './js')
			filename: 'bundle.js'

		devtool: 'source-map'

		module:
			rules: [
				{
					test: /\.coffee$/
					loader: 'coffee-loader'
					options:
						sourceMap: true
				}
			]

		resolveLoader:
			modules: [path.resolve(__dirname, '../node_modules')]
			extensions: ['*', '.coffee', '.js', '.json']
	}