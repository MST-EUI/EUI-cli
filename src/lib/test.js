const path = require('path');
const jest = require('jest');

module.exports = {
  name: 'test',
  description: 'Run Jest for test',
  hasOptions: true,
  options: [
    ['--coverage', 'jest --coverage'],
    ['--watch', 'jest --watch'],
  ],
  action: (...args) => {
    const cmd = args.splice(-1)[0];
    const argv = args;
    if (cmd.coverage) {
      argv.push('--coverage');
    }
    if (cmd.watch) {
      argv.push('--watch');
    }
    argv.push(
      '--config',
      path.resolve(__dirname, './../config/jest.config.js'),
    );
    jest.run(argv);
  },
};
