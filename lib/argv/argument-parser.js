'use strict';

const ParserInterface = require('../parser-interface');
const minimist = require('minimist')

class ArgumentParser extends ParserInterface {
  parse (argv) {
    return minimist(argv, {
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
    })
  }
}

module.exports = ArgumentParser
