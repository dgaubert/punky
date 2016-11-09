'use strict'

const LoggerInterface = require('./logger-interface')

class Logger extends LoggerInterface {
  constructor (logger, sighupListener) {
    super()
    this.provider = logger
    sighupListener.listen(() => this.reload())
  }

  reload () {
    this.provider.reopenFileStreams()
  }

  child (requestId) {
    return this.provider.child({ requestId })
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
