const webpack = require('webpack');
const util = require('./utils');

module.exports = {
  entry: {
    app: [
      util.cwdPath('./demo/index.js'),
      'webpack-hot-middleware/client?reload=true&noInfo=true',
    ],
  },
  output: {
    filename: '[name].js',
    path: util.cwdPath('dist'),
    library: 'demo',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  cache: true,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify-loader'],
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
    // new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
