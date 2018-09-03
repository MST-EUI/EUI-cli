const init = require('./lib/init');
const build = require('./lib/build');
const server = require('./lib/server');
const lint = require('./lib/lint');
const test = require('./lib/test');

module.exports = {
  init,
  build,
  server,
  lint,
  test,
};
