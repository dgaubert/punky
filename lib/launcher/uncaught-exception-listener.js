'use strict'

const ListenerInterface = require('../listener-interface')

class UncaughtExceptionListener extends ListenerInterface {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen (exit) {
    this.emitter.once('uncaughtException', err => {
      this.logger.error('Uncaught Exception', err)
      exit(1)
    })
  }
}

module.exports = UncaughtExceptionListener
