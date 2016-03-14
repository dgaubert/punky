'use strict'

const colorize = require('winston').config.colorize
const ConsoleTransport = require('winston').transports.Console

class ConsoleOutput extends ConsoleTransport {
  constructor () {
    super({
      formatter: (options) => {
        const level = colorize(options.level, options.level.toUpperCase())

        return level + ': ' +
          new Date().toISOString() + ' - ' +
          options.meta.role + ' ' +
          options.meta.pid + ' - ' +
          options.message
      }
    })
  }
}

module.exports = ConsoleOutput
