const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const chalk = require('chalk');
const portscanner = require('portscanner');
const ip = require('ip');

const util = require('../utils');
const webpackConfig = require('../config/webpack.config.dev');

const { log, error } = console;

module.exports = {
  name: 'server', // used for program.command(<name>), required
  description: 'Server for development',
  action: () => {
    let port = 4000;
    const ipAddr = ip.address();
    const cwd = process.cwd();

    portscanner.findAPortNotInUse(port, port + 10, ipAddr, (err, avaiblePort) => {
      if (err || !avaiblePort) {
        error(chalk.red.bold(`Port ${port} in use. exit now!`));
        return process.exit(1);
      }
      if (avaiblePort !== port) {
        log(chalk.red.bold(`Port ${port} in use, change to ${avaiblePort}`));
        port = avaiblePort;
      }
      const address = `http://${ipAddr}:${port}`;

      // compiler
      const webpackCompiler = webpack(webpackConfig);

      // express server
      const app = express();

      // dev middleware
      const devMiddlewareOpts = {
        publicPath: '/',
        stats: {
          chunks: false,
        },
      };
      app.use(webpackDevMiddleware(webpackCompiler, devMiddlewareOpts));

      // hot middleware
      app.use(webpackHotMiddleware(webpackCompiler));

      // serve static files
      app.use(express.static(cwd));
      app.listen(port, (appErr) => {
        if (appErr) {
          log(appErr);
        }
        log(`Listening at ${chalk.green(address)}`);
        // open default browser
        util.open(address);
      });
      return true;
    });
  },
};
