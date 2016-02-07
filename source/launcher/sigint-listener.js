'use strict'

const Listener = require('../listener')

class SigintListener extends Listener {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen (exit) {
    this.emitter.once('SIGINT', () => {
      this.logger.warn('SIGINT received')
      exit()
    })
  }
}

module.exports = SigintListener
