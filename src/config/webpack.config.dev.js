const webpack = require('webpack');
const { relPath, cwdPath } = require('../utils');

module.exports = {
  entry: {
    app: [
      cwdPath('./demo/index.js'),
      relPath('../node_modules/webpack-hot-middleware/client?reload=true&noInfo=true'),
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
        loader: require.resolve('babel-loader'),
        query: {
          presets: ['env', 'react', 'stage-0'].map(item => require.resolve(`babel-preset-${item}`)),
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: `${require.resolve('style-loader')}!${require.resolve('css-loader')}!${require.resolve('sass-loader')}`,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: `${require.resolve('file-loader')}`,
      },
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: [require.resolve('es3ify-loader')],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      module: false,
    }),
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
