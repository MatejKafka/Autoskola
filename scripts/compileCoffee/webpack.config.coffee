path = require('path')
BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


CLIENT_RES_PATH = path.resolve(__dirname, '../../client/res')



USE_PRODUCTION = true
GENERATE_BUNDLE_ANALYSIS = false



baseConfig = {
	entry: path.resolve(CLIENT_RES_PATH, './coffee/index.coffee')
	output:
		path: path.resolve(CLIENT_RES_PATH, './js')
		filename: 'bundle.js'

	devtool: 'source-map'

	plugins: []

	module:
		rules: [
			{
				test: /\.coffee$/
				loader: 'coffee-loader'
				options:
					sourceMap: true
			}
		]

	resolve:
		# give higher priority to .coffee files when both .coffee and .js is available
		extensions: ['*', '.coffee', '.js', '.json']

	resolveLoader:
		modules: [path.resolve(__dirname, '../node_modules')]
		extensions: ['*', '.coffee', '.js', '.json']
}


if USE_PRODUCTION
	baseConfig.mode = 'production'
else
	baseConfig.mode = 'development'


if GENERATE_BUNDLE_ANALYSIS
	baseConfig.plugins.push(new BundleAnalyzerPlugin())


module.exports = ->
	return baseConfig