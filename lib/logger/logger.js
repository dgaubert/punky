'use strict'

const LoggerInterface = require('./logger-interface')

class Logger extends LoggerInterface {
  constructor (logger) {
    super()
    this.logger = logger
  }

  debug () {
    this.logger.debug(...arguments)
  }

  log () {
    this.logger.info(...arguments)
  }

  info () {
    this.logger.info(...arguments)
  }

  warn () {
    this.logger.warn(...arguments)
  }

  error () {
    this.logger.error(...arguments)
  }
}

module.exports = Logger
