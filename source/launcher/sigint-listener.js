'use strict'

const Listener = require('../listener')

class SigintListener extends Listener {
  constructor (logger) {
    super()
    this.logger = logger
  }

  listen (exit) {
    process.once('SIGINT', () => {
      this.logger.warn('SIGINT received')
      process.removeListener('SIGINT', this._listener)
      exit()
    })
  }
}

module.exports = SigintListener
