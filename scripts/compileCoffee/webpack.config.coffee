path = require('path')
BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


CLIENT_RES_PATH = path.resolve(__dirname, '../../client/res')



USE_PRODUCTION = false
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


module.exports = (useProductionMode = USE_PRODUCTION, analyzeBundle = GENERATE_BUNDLE_ANALYSIS) ->
	config = Object.assign({}, baseConfig)
	if useProductionMode
		config.mode = 'production'
	else
		config.mode = 'development'

	if analyzeBundle
		config.plugins.push(new BundleAnalyzerPlugin())

	return config