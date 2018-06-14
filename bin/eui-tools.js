#!/usr/bin/env node

'use strict'

const pkg = require('../package.json')


const init = require('../src/init')

const program = require('commander')

program
    .version(pkg.version)
    .usage('<command> [options]')

program
    .command('init [type]')
    .description('init a eui component template for developer')
    .action(() => {
        init();
    })

program.parse(process.argv)