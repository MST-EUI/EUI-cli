const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const rm = require('rimraf');
const webpackConfig = require('../webpack.config.prod');
const pkg = require('../../package.json');

const { log } = console;
const cwd = process.cwd();

module.exports = {
  name: 'build', // used for program.command(<name>), required
  description: 'Build component before publish',
  action: () => {
    // remove old files before build start
    rm(path.join(cwd, 'dist'), {}, () => {});

    log('Build start...');
    log(`EUI-tools version: ${pkg.version}`);
    log('');
    webpack(webpackConfig, (err, stats) => { // eslint-disable-line
      if (err) {
        return err.toString();
      }
      log(stats.toString());
      log(chalk.green('Build successful.'));
    });
  },
};
