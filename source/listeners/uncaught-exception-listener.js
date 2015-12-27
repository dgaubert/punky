'use strict'

const Listener = require('./listener')

class UncaughtExceptionListener extends Listener {
  constructor (logger) {
    super()
    this.logger = logger
  }

  listen (exit) {
    this._listener = (err) => {
      this.logger.error('Uncaught Exception', err.stack)
      process.removeListener('uncaughtException', this._listener)
      exit(1)
    }

    process.on('uncaughtException', this._listener)
  }

}

module.exports = UncaughtExceptionListener
