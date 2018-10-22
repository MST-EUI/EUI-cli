const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  passPerPreset: true,
  presets: [
    'babel-preset-react',
    'babel-preset-env',
    'babel-preset-stage-0',
  ], // .map(require.resolve),
  plugins: [
    'babel-plugin-transform-runtime',
    [
      'import', {
        libraryName: '@mistong/eui',
      },
    ],
  ], // .map(require.resolve),
});
