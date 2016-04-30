'use strict'

const ParserInterface = require('../parser-interface')
const meow = require('meow')

class ArgumentParser extends ParserInterface {
  parse () {
    const options = {
      alias: {
        c: 'cluster',
        p: 'port',
        v: 'version'
      },
      boolean: [ // options that are always boolean
        'cluster'
      ],
      default: {
        cluster: false,
        port: 3000
      }
    }
    const help = `
      Usage:
        $ npm start [-- <options>]

      Options:
        -c, --cluster Enable cluster mode (default: disable)
        -p, --port    Specific listening port (default: 3000)

      Examples
        $ npm start -- -c -p 8000
    `
    const processOptions = meow(help, options)

    return processOptions.flags
  }
}

module.exports = ArgumentParser
