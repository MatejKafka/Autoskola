// Generated by CoffeeScript 1.11.1
(function() {
  var BundleAnalyzerPlugin, CLIENT_RES_PATH, GENERATE_BUNDLE_ANALYSIS, USE_PRODUCTION, baseConfig, path;

  path = require('path');

  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  CLIENT_RES_PATH = path.resolve(__dirname, '../../client/res');

  USE_PRODUCTION = true;

  GENERATE_BUNDLE_ANALYSIS = false;

  baseConfig = {
    entry: path.resolve(CLIENT_RES_PATH, './coffee/index.coffee'),
    output: {
      path: path.resolve(CLIENT_RES_PATH, './js'),
      filename: 'bundle.js'
    },
    devtool: 'source-map',
    plugins: [],
    module: {
      rules: [
        {
          test: /\.coffee$/,
          loader: 'coffee-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    resolve: {
      extensions: ['*', '.coffee', '.js', '.json']
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, '../node_modules')],
      extensions: ['*', '.coffee', '.js', '.json']
    }
  };

  if (USE_PRODUCTION) {
    baseConfig.mode = 'production';
  } else {
    baseConfig.mode = 'development';
  }

  if (GENERATE_BUNDLE_ANALYSIS) {
    baseConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  module.exports = function() {
    return baseConfig;
  };

}).call(this);

//# sourceMappingURL=webpack.config.js.map
