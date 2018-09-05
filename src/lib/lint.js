const { existsSync, readFileSync } = require('fs');
const { CLIEngine } = require('eslint');
const chalk = require('chalk');
const eslintConfig = require('../config/.eslintrc.js');
const { cwdPath } = require('../utils');

const { log } = console;
const getIgnoreContent = (filePath) => {
  const contents = readFileSync(filePath, { encoding: 'utf8' });
  return contents.split('\n').filter(Boolean);
};

module.exports = {
  name: 'lint',
  description: 'Lint for source code',
  hasOptions: true,
  options: [
    ['--fix', 'eslint fix'],
  ],
  action: (...args) => {
    const cmd = args.splice(-1)[0];
    const customTarget = args;
    const target = customTarget.length !== 0 ? customTarget : [
      cwdPath('./src/*.js'),
      cwdPath('./demo/*.js'),
    ];
    const ignorePattern = existsSync(cwdPath('.eslintignore'))
      ? getIgnoreContent(cwdPath('.eslintignore'))
      : getIgnoreContent('.eslintignore');
    const linter = new CLIEngine({
      cwd: process.cwd(),
      baseConfig: eslintConfig,
      useEslintrc: true,
      ignorePattern,
      fix: cmd.fix,
    });
    const report = linter.executeOnFiles(target);
    let { errorCount } = report;
    // write any fix to disk
    if (cmd.fix) {
      CLIEngine.outputFixes(report);
      errorCount -= report.fixableErrorCount;
    }

    if (errorCount > 0) {
      const formatter = CLIEngine.getFormatter();
      const output = formatter(report.results);
      log(output);
      process.exit(1);
    } else {
      log(chalk.green('Lint Success'));
    }
  },
};
