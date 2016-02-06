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
      exit()
    })
  }
}

module.exports = SigintListener
