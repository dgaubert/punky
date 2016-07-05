'use strict'

const ParserInterface = require('../parser-interface')
const meow = require('meow')
const path = require('path')
const readPkgUp = require('read-pkg-up')

class ArgumentParser extends ParserInterface {
  static parse () {
    const pkg = readPkgUp.sync({
      cwd: process.cwd(),
      normalize: false
    }).pkg

    const options = {
      alias: {
        c: 'cluster',
        p: 'port',
        l: 'log',
        v: 'version'
      },
      boolean: [ // options that are always boolean
        'cluster'
      ],
      default: {
        cluster: false,
        port: 3000,
        log: path.join(process.cwd(), pkg.name + '.log')
      }
    }
    const help = `
      Usage:
        $ npm start [-- <options>]

      Options:
        -c, --cluster Enable cluster mode (default: disable)
        -p, --port    Specific listening port (default: 3000)
        -l, --log     Path to log (default: current working directory)

      Examples
        $ npm start -- -c -p 8000
    `
    const processOptions = meow({ help, pkg }, options)

    return processOptions.flags
  }
}

module.exports = ArgumentParser
