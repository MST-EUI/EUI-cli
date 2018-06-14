'use strict'

const fs = require('fs')
const path = require('path')

const download = require('download')
const { log, error }= console


const utils = {
    fetchTpl: (url) => {
        return new Promise((resolve, reject) => {
            download(url, process.cwd(), {
                extract: true,
                retries: 0,
                timeout: 10000
            }).then(files => {
                resolve();
            }).catch(err => {
                error(err)
            })
        })
    }
}


module.exports = utils