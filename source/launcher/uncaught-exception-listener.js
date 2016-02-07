'use strict'

const Listener = require('../listener')

class UncaughtExceptionListener extends Listener {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen (exit) {
    this.emitter.once('uncaughtException', (err) => {
      this.logger.error('Uncaught Exception', err.stack)
      exit(1)
    })
  }
}

module.exports = UncaughtExceptionListener
