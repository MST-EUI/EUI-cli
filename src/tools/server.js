const path = require('path');
const { exec } = require('child_process');

const { log, error } = console;
const cwd = process.cwd();
let customCommand = `./node_modules/.bin/webpack-dev-server --open --inline --history-api-fallback --config ${path.join(__dirname, '../', 'webpack.config.dev.js')} --hot --progress --port 4000`;

module.exports = {
  name: 'server', // used for program.command(<name>), required
  description: 'webpack-dev-server for development',
  run: (type) => {
    if (type === 'ie') {
      customCommand = customCommand.replace(/--inline/g, '');
    }

    const server = exec(customCommand, {
      cwd,
    }, (err, stdout, stderr) => {
      if (err) {
        error(`exec error: ${err}`);
        return;
      }
      log(`${stdout}`);
      log(`${stderr}`);
    });

    server.on('stdin', (data) => {
      log(data);
    });
    server.on('stdout', (data) => {
      log(data);
    });
  },
};
