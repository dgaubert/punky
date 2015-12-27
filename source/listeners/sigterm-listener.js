'use strict'

const Listener = require('./listener')

class SigtermListener extends Listener {
  constructor (logger) {
    super()
    this.logger = logger
  }

  listen (exit) {
    this._listener = () => {
      this.logger.warn('SIGTERM received')
      process.removeListener('SIGTERM', this._listener)
      exit()
    }

    process.on('SIGTERM', this._listener)
  }
}

module.exports = SigtermListener
