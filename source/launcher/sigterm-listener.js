'use strict'

const Listener = require('../listener')

class SigtermListener extends Listener {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen (exit) {
    this.emitter.once('SIGTERM', () => {
      this.logger.warn('SIGTERM received')
      exit()
    })
  }
}

module.exports = SigtermListener
