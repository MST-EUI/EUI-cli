const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const chalk = require('chalk');
const portscanner = require('portscanner');
const ip = require('ip');

const util = require('../utils');
const webpackConfig = require('../webpack.config.prod');

const { log, error } = console;

module.exports = {
  name: 'server', // used for program.command(<name>), required
  description: 'server for development',
  run: () => {
    let port = 4000;
    const ipAddr = ip.address();

    portscanner.findAPortNotInUse(port, port + 10, ipAddr, (err, avaiblePort) => {
      if (err || !avaiblePort) {
        error(chalk.red.bold(`Port ${port} in use. exit now!`));
        return process.exit(1);
      }
      if (avaiblePort !== port) {
        log(chalk.red.bold(`Port ${port} in use, Change to ${avaiblePort}`));
        port = avaiblePort;
      }
      const address = `http://${ipAddr}:${port}`;
      log(address);

      const app = express();
      app.listen(port, (appErr) => {
        if (appErr) {
          log(appErr);
        }
        log(`listened at ${address}`);
      });
    });
    return;
    const app = express();
    const compiler = webpack(webpackConfig);

    app.use((req, res, next) => {
      // support cors
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    });

    app.use(webpackDevMiddleware(compiler, {
      // options
    }));
    app.get('/', (req, res) => res.send('Hello World!'));
    app.use(express.static('/'));
    app.listen('4000', (err) => {
      if (err) {
        log(err);
        return;
      }
      const address = 'http://localhost:4000';
      log(`Listening at ${chalk.green.bold(address)}`);

      // open url in default browser
      util.open(address);
    });
  },
};
