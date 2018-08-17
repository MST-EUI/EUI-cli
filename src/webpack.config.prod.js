const ExtractTextPlugin = require('extract-text-webpack-plugin');
const util = require('./utils');

module.exports = {
  entry: {
    index: util.cwdPath('./src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: util.cwdPath('dist'),
    publicPath: '/',
    library: 'demo',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader'),
        // loader: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader'],
        // }),
        // loader: 'style!css!sass',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
      },
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
