const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const { log, error } = console;
const chalk = require('chalk');
const download = require('download');
const mkdirp = require('mkdirp');

const cwd = process.cwd();

const utils = {
  fetchTpl(url) {
    return new Promise((resolve) => {
      log(chalk.blue('Start Download Template ...'));
      download(url, cwd, {
        extract: true,
        // retries: 0,
        // timeout: 10000,
      }).then((files) => {
        log(chalk.green('Download Template Success!'));
        resolve(files);
      }).catch((err) => {
        log('');
        log(chalk.red(`Download Template Error: ${url}`));
        error(err);
      });
    });
  },
  writeFile({ path: filePath, data }) {
    const targetPath = path.resolve(cwd, filePath.split('/').slice(1).join('/'));
    try {
      mkdirp.sync(path.dirname(targetPath));
      log(`Generate file: ${targetPath}`);
      fs.writeFileSync(targetPath, data);
    } catch (err) {
      log(chalk.red(`Write File ${targetPath} Error:`));
      error(err);
    }
  },
  // open url in default browser
  open(url) {
    let command;
    switch (process.platform) {
      case 'darwin':
        command = 'open';
        break;
      case 'win32':
        command = 'explorer.exe';
        break;
      case 'linux':
        command = 'xdg-open';
        break;
      default:
        error('Can not open browser');
        return;
    }
    spawn(command, [url]);
  },
  // get absolute path to cwd
  cwdPath(...args) {
    return path.resolve(process.cwd(), ...args);
  },
  // get absolute path to __dirname
  relPath(...args) {
    return path.resolve(__dirname, ...args);
  },
};


module.exports = utils;
