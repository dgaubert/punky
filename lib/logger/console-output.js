'use strict'

const colorize = require('winston').config.colorize
const ConsoleTransport = require('winston').transports.Console

class ConsoleOutput extends ConsoleTransport {
  constructor (options = {}) {
    if (process.env.NODE_ENV === 'test') {
      options.level = 'error'
    }

    options.formatter = (options) => {
      const level = colorize(options.level, options.level.toUpperCase())

      return level + ': ' +
        new Date().toISOString() + ' - ' +
        options.meta.role + ' ' +
        options.meta.pid + ' - ' +
        options.message
    }

    super(options)
  }
}

module.exports = ConsoleOutput
