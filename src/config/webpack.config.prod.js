const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { cwdPath } = require('../utils');

module.exports = {
  entry: {
    index: cwdPath('./src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: cwdPath('dist'),
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
        loader: require.resolve('babel-loader'),
        query: {
          presets: ['env', 'react', 'stage-0'].map(item => require.resolve(`babel-preset-${item}`)),
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: ExtractTextPlugin.extract(`${require.resolve('style-loader')}`, `${require.resolve('css-loader')}!${require.resolve('sass-loader')}`),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: require.resolve('file-loader'),
      },
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: [require.resolve('es3ify-loader')],
      },
    ],
  },
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
  plugins: [
    new ExtractTextPlugin('index.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        beautify: true,
        quote_keys: true,
      },
      mangle: {
        screw_ie8: false,
      },
      sourceMap: false,
    }),
  ],
};
