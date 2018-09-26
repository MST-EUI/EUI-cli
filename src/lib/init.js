const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const rm = require('rimraf');
const alias = require('../config/alias');
const { fetchTpl, writeFile } = require('../utils');

const { log } = console;

const questions = [
  {
    name: 'name', // used for program.command(<name>), required
    message: 'Component Name:',
    default: path.basename(process.cwd()),
    validate: name => (/^eui-/.test(name)
      ? true
      : log(chalk.yellow('Component Name should start with eui-'))),
  },
  {
    name: 'description',
    message: 'Description:',
    default: 'An eui component',
  },
];

module.exports = {
  name: 'init',
  description: ' Initialize a eui component template for developer',
  action: () => {
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

    const todo = async () => {
      const answer = await inquirer.prompt(questions);
      const files = await fetchTpl(tplUrl);
      log(chalk.blue('Start to Copy Files'));
      // 根据download下来的文件重写到本地当前目录
      files.filter(({ type }) => type === 'file').forEach((file) => {
        if (/package.json$/.test(file.path.split('/')[1])) {
          const newPkgData = Object.assign({}, JSON.parse(file.data), answer);
          const { name } = newPkgData;
          const tplName = 'eui-component-tpl';
          newPkgData.name = `@mistong/${name}`;
          newPkgData.version = '0.1.0';
          newPkgData.repository.url = newPkgData.repository.url.replace(tplName, name);
          newPkgData.bugs.url = newPkgData.bugs.url.replace(tplName, name);
          newPkgData.homepage = newPkgData.homepage.replace(tplName, name);
          fs.writeFileSync(`${process.cwd()}/package.json`, Buffer.from(JSON.stringify(newPkgData, null, 2)));
        } else {
          writeFile(file);
        }
      });
      log(chalk.green(`Init component ${answer.name} success!`));
      // 删除download下来的目录
      rm(files[0].path, {}, () => {});
    };
    todo();
  },
};
