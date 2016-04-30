'use strict'

const LoggerInterface = require('../logger-interface')

class WinstonLogger extends LoggerInterface {
  constructor (logger, role) {
    super()
    this.logger = logger

    this.logger.rewriters.push((level, message, meta) => {
      meta.role = role
      meta.pid = process.pid

      return meta
    })
  }

  log () {
    this.logger.log.apply(this.logger, arguments)
  }

  info () {
    this.logger.info.apply(this.logger, arguments)
  }

  warn () {
    this.logger.warn.apply(this.logger, arguments)
  }

  error () {
    this.logger.error.apply(this.logger, arguments)
  }
}

module.exports = WinstonLogger
