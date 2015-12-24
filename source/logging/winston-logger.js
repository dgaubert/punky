'use strict';

const Logger = require('./logger');
const winston =  require('winston');
const cluster = require('cluster');

class WinstonLogger extends Logger {
  constructor() {
    super();
    this.logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
          timestamp: true,
          colorize: true
        })
      ]
    });

    this.logger.filters.push((level, message, meta) => {
      return '[ ' + process.title + ': ' + process.pid + ' ] ' + message;
    });
  }

  log() {
    this.logger.log.apply(this.logger, arguments);
  }

  info() {
    this.logger.info.apply(this.logger, arguments);
  }

  warn() {
    this.logger.warn.apply(this.logger, arguments);
  }

  error() {
    this.logger.error.apply(this.logger, arguments);
  }
}

module.exports = WinstonLogger;
