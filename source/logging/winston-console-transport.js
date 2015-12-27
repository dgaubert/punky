'use strict'

const winston = require('winston')
const colorize = require('winston').config.colorize
const ConsoleTransport = require('winston').transports.Console

class WinstonConsole {
  static create() {
    return new ConsoleTransport({
      formatter: function (options) {
        var level = colorize(options.level, options.level.toUpperCase())

        return level + ': ' +
        new Date().toISOString() + ' - ' +
        options.meta.role + ' ' +
        options.meta.pid + ' - ' +
        options.message
      }
    })
  }
}

module.exports = WinstonConsole
