'use strict'

const LoggerInterface = require('../logger-interface')

class Logger extends LoggerInterface {
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
    this.logger.log(...arguments)
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
