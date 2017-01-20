'use strict'

const Listener = require('../listener')

class UncaughtExceptionListener extends Listener {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'uncaughtException'
  }

  listen (exit) {
    const uncaughtExceptionListener = err => {
      this.logger.error('Uncaught Exception', err)
      exit(1)
    }

    this.handler = uncaughtExceptionListener
    super.listen()
  }
}

module.exports = UncaughtExceptionListener
