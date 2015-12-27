'use strict';

const winston = require('winston');
const ConsoleTransport =  require('winston').transports.Console;

class WinstonConsole {
  static create() {
    return new ConsoleTransport({
      formatter: function (options) {
        var colorize = winston.config.colorize;
        var level = colorize(options.level, options.level.toUpperCase());

        return level + ': ' + new Date().toISOString() + ' - ' + options.meta.role + ' ' + options.meta.pid + ' - ' + options.message;
      }
    });
  }
}

module.exports = WinstonConsole;
