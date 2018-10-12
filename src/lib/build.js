const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const rm = require('rimraf');
const webpackConfig = require('../config/webpack.config.prod');
const pkg = require('../../package.json');

const { log, error } = console;
const cwd = process.cwd();

module.exports = {
  name: 'build', // used for program.command(<name>), required
  description: 'Build component before publish',
  action: () => {
    // remove old files before build start
    rm(path.join(cwd, 'dist'), {}, () => {});

    log('Build start...');
    log(`Tools eui-cli version: ${pkg.version}`);
    log('');
    webpack(webpackConfig, (err, stats) => { // eslint-disable-line
      if (err) {
        error(err.stack || err);
        if (err.details) {
          error(err.details);
        }
        return;
      }

      log(stats.toString({
        colors: true,
      }));

      if (!stats.hasErrors()) {
        log(chalk.green('Build successful.'));
      }
    });
  },
};
