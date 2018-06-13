#!/usr/bin/env node

'use strict'

const {
    version,
    engines: {
        node: requiredVersion
    }
} = require('../package.json')


const init = require('../src/init')

const program = require('commander')

program
    .version(version)
    .usage('<command> [options]')

program
    .command('init')
    .description('init a eui component template for developer')
    .action(() => {
        init();
    })

program.parse(process.argv)