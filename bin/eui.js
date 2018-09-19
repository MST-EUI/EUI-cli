#!/usr/bin/env node

const program = require('commander');
const updater = require('pkg-updater');
const tools = require('../src');
const pkg = require('../package.json');

updater({
  pkg,
  checkInterval: 60 * 60 * 1000,
}).then(() => {
  program
    .version(pkg.version)
    .usage('<command> [options]');

  Object.keys(tools).forEach((item) => {
    const {
      name = '',
      description = '',
      hasOptions = false,
      options = [],
      action = () => {},
    } = tools[item];
    const cmd = program
      .command(name)
      .description(description);
    // add options for command
    if (hasOptions) {
      options.forEach((option) => {
        cmd.option(...option);
      });
    }
    cmd.action((...args) => {
      action.apply(this, args);
    });
  });

  program.parse(process.argv);
});
