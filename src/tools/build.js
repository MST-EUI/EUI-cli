const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const rm = require('rimraf');
const webpackConfig = require('../webpack.config.prod');

const { log } = console;
const cwd = process.cwd();

module.exports = {
  name: 'build', // used for program.command(<name>), required
  description: 'build component before publish',
  run: () => {
    // remove old files before build start
    rm(path.join(cwd, 'dist'), {}, () => {});

    log('build start...');
    log('');
    webpack(webpackConfig, (err, stats) => { // eslint-disable-line
      if (err) {
        return err.toString();
      }
      log(chalk.green('build is successful.'));
    });
  },
};
