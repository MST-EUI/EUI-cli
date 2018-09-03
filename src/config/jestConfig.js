const path = require('path');
const { cwdPath } = require('../utils');

module.exports = {
  rootDir: process.cwd(),
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': cwdPath('__mocks__/file.js'),
    '\\.(css|scss)$': require.resolve('identity-obj-proxy'),
  },
  transform: {
    '\\.js$': path.resolve(__dirname, 'babelTransform.js'),
  },
  // collectCoverageFrom: ['src/**/*.js'],
  // testRegex: 'src/.*__spec\\.js$',
};