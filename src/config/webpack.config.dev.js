const webpack = require('webpack');
const { cwdPath } = require('../utils');

module.exports = {
  entry: {
    app: [
      cwdPath('./demo/index.js'),
      cwdPath('./node_modules/webpack-hot-middleware/client?reload=true&noInfo=true'),
    ],
  },
  output: {
    filename: '[name].js',
    path: cwdPath('dist'),
  },
  cache: true,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'stage-0'].map(item => require.resolve(`babel-preset-${item}`)),
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      module: false,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: [
      cwdPath('./node_modules'),
      process.cwd(),
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx'],
  },
  resolveLoader: {
    modulesDirectories: [
      cwdPath('./node_modules'),
    ],
  },
};
