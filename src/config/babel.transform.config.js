const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  passPerPreset: true,
  presets: [
    'babel-preset-react',
    'babel-preset-env',
    'babel-preset-stage-0',
  ].map(require.resolve),
  plugins: [
    require.resolve('babel-plugin-transform-runtime'),
    [
      require.resolve('babel-plugin-import'), {
        libraryName: '@mistong/eui',
      },
    ],
  ],
});
