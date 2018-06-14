'use strict'

const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const log = console.log
const inquirer = require('inquirer')

const alias = require('../alias')
const utils = require('./utils')


const questions = [
    {
        name: 'name',
        message: 'Component Name:',
        default: path.basename(process.cwd()),
        validate: name => 
            /^eui+\-/.test(name)
            ? true
            : log(chalk.yellow(` Component Name should start with eui-}`))
    },
    {
        name: 'description',
        message: 'Description:',
        default: 'An eui component'
    },
    {
        name: 'author',
        message: 'Author Name:',
        default: process.env['USER'] || process.env['USERNAME'] || ''
    }
]


module.exports = () => {

    const tplType = process.argv[3] || 'pc'
    const tplUrl = alias[tplType]

    if (tplUrl === undefined && !/^https?:\/\//.test(tplUrl)) {
        log(chalk.red(`Can not find template: ${tplType}`))
        return
    }

    log('')
    log('Welcome to eui-component generator!')
    log('You are going to generator your component with this template:')
    log(chalk.green(tplUrl))
    log('')
    log(path.basename(process.cwd()))

    Promise.all([
        inquirer.prompt(questions),
        utils.fetchTpl(tplUrl)
    ]).then(([results, path]) => {
        log(results, path);
    })
}