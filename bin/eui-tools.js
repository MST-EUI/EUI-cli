#!/usr/bin/env node

const program = require('commander');
const tools = require('../src');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .usage('<command> [options]');

Object.keys(tools).forEach((item) => {
  const { name, description, action } = tools[item];
  program
    .command(name)
    .description(description)
    .action((option) => {
      action.call(this, option);
    });
});

program.parse(process.argv);
