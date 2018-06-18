const fs = require('fs');
const path = require('path');

const { log, error } = console;
const download = require('download');
const mkdirp = require('mkdirp');

const cwd = process.cwd();

const utils = {
  fetchTpl(url) {
    return new Promise((resolve) => {
      download(url, cwd, {
        extract: true,
        retries: 0,
        timeout: 10000,
      }).then((files) => {
        resolve(files);
      }).catch((err) => {
        log(`Download Template Error: ${err}`);
        error(err);
      });
    });
  },
  writeFile({ path: filePath, data }) {
    const targetPath = path.join(cwd, filePath.split('/').slice(1).join('/'));
    try {
      mkdirp.sync(path.dirname(targetPath));
      log(`Generate file: ${targetPath}`);
      fs.writeFileSync(targetPath, data);
    } catch (err) {
      log(`Write File ${targetPath} Error:`);
      error(err);
    }
  },
};


module.exports = utils;
