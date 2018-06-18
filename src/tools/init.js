const path = require('path');

const { log } = console;
const chalk = require('chalk');
const inquirer = require('inquirer');
const rm = require('rimraf');

const alias = require('../../alias');
const { fetchTpl, writeFile } = require('../utils');

const questions = [
  {
    name: 'name', // used for program.command(<name>), required
    message: 'Component Name:',
    default: path.basename(process.cwd()),
    validate: (name) => {
      if (/^eui+-/.test(name)) {
        return true;
      }
      log(chalk.yellow(' Component Name should start with eui-}'));
      return false;
    },
  },
  {
    name: 'description',
    message: 'Description:',
    default: 'An eui component',
  },
  {
    name: 'author',
    message: 'Author Name:',
    default: process.env.USER || process.env.USERNAME || '',
  },
];


module.exports = {
  name: 'init',
  description: 'init a eui component template for developer',
  run: () => {
    const tplType = process.argv[3] || 'pc';
    const tplUrl = /^https?:\/\//.test(tplType) ? tplType : alias[tplType];

    if (tplUrl === undefined) {
      log(chalk.red(`Can not find template: ${tplType}`));
      return;
    }

    log('');
    log('Welcome to eui-component generator!');
    log('May I ask you some questions?');
    log('');

    Promise.all([
      inquirer.prompt(questions),
      fetchTpl(tplUrl),
    ]).then(([results, files]) => {
      log('Start to Copy Files');
      // 根据download下来的文件重写到本地当前目录
      files.filter(({ type }) => type === 'file').map(file => writeFile(file));
      // 删除download下来的目录
      rm(files[0].path, {}, () => {});
      log('');
      log(chalk.green(`Generator Component ${results.name} Success!`));
    }).catch((err) => {
      log(`Generator Component Error: ${err}`);
    });
  },
};
