'use strict'

const LoggerInterface = require('./logger-interface')

class Logger extends LoggerInterface {
  constructor (logger) {
    super()
    this.provider = logger
  }

  subLogger () {
    return this.provider(...arguments)
  }

  debug () {
    this.provider.debug(...arguments)
  }

  log () {
    this.provider.info(...arguments)
  }

  info () {
    this.provider.info(...arguments)
  }

  warn () {
    this.provider.warn(...arguments)
  }

  error () {
    this.provider.error(...arguments)
  }
}

module.exports = Logger
