const path = require('path');
const webpack = require('webpack');
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
    library: `@mistong/${path.basename(process.cwd())}`,
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'es2015', 'react', 'stage-0'].map(item => require.resolve(`babel-preset-${item}`)),
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
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
  resolveLoader: {
    modulesDirectories: [
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};
