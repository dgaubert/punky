'use strict';

const minimist = require('minimist')

class ArgumentParser {
  constructor(argv) {
    this.argv = argv
  }

  parse () {
    return minimist(this.argv, {
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

module.exports = ArgumentParser;
