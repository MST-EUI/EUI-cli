const path = require('path');
const { exec } = require('child_process');
// const express = require('express');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const chalk = require('chalk');

// const util = require('../utils');
// const webpackConfig = require('../webpack.config.prod');

const { log, error } = console;
const cwd = process.cwd();
let customCommand = `./node_modules/.bin/webpack-dev-server --open --inline --history-api-fallback --config ${path.join(__dirname, '../', 'webpack.config.dev.js')} --hot --progress --port 4000`;

module.exports = {
  name: 'server', // used for program.command(<name>), required
  description: 'webpack-dev-server for development',
  run: (type) => {
    // const app = express();
    // const compiler = webpack(webpackConfig);

    // app.use((req, res, next) => {
    //   // support cors
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    //   next();
    // });

    // app.use(webpackDevMiddleware(compiler, {
    //   // options
    // }));
    // app.get('/', (req, res) => res.send('Hello World!'));
    // app.use(express.static('/'));
    // app.listen('4000', (err) => {
    //   if (err) {
    //     log(err);
    //     return;
    //   }
    //   const address = 'http://localhost:4000';
    //   log(`Listening at ${chalk.green.bold(address)}`);

    //   // open url in default browser
    //   util.open(address);
    // });
    // return;
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
