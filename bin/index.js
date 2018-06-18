#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const eui = require('../src');
const pkg = require('../package.json');

const { log } = console;

program
  .version(pkg.version)
  .usage('<command> [options]');

Object.keys(eui).forEach((it) => {
  const { name, description, run } = eui[it];
  if (!name) {
    log(chalk.yellow(`plugin ${it} has error`));
    log('');
    log(chalk.red('<name> is required'));
    return;
  }
  program
    .command(name)
    .description(description || '')
    .action((option) => {
      if (typeof run === 'function') {
        run(option);
      }
    });
});

program.parse(process.argv);
