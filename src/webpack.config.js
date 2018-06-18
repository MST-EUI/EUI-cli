const path = require('path');

const cwd = process.cwd();

module.exports = {
  entry: {
    index: path.join(cwd, './src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.join(cwd, 'dist'),
    publicPath: '/',
    library: 'demo',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
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
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
