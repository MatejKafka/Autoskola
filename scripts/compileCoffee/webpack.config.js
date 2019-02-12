// Generated by CoffeeScript 1.11.1
(function() {
  var CLIENT_RES_PATH, path;

  path = require('path');

  CLIENT_RES_PATH = path.resolve(__dirname, '../../client/res');

  module.exports = function() {
    return {
      entry: path.resolve(CLIENT_RES_PATH, './coffee/index.coffee'),
      output: {
        path: path.resolve(CLIENT_RES_PATH, './js'),
        filename: 'bundle.js'
      },
      devtool: 'source-map',
      module: {
        loaders: [
          {
            test: /\.coffee$/,
            loader: 'coffee-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      resolveLoader: {
        modules: [path.resolve(__dirname, '../node_modules')]
      },
      resolve: {
        extensions: ['*', '.coffee', '.js', '.json']
      }
    };
  };

}).call(this);

//# sourceMappingURL=webpack.config.js.map