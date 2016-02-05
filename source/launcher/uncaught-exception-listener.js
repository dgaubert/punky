'use strict'

const Listener = require('../listener')

class UncaughtExceptionListener extends Listener {
  constructor (logger) {
    super()
    this.logger = logger
  }

  listen (exit) {
    process.once('uncaughtException', (err) => {
      this.logger.error('Uncaught Exception', err.stack)
      exit(1)
    })
  }

}

module.exports = UncaughtExceptionListener
