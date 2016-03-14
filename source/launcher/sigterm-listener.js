'use strict'

const ListenerInterface = require('../listener-interface')

class SigtermListener extends ListenerInterface {
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
