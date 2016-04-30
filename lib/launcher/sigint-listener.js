'use strict'

const ListenerInterface = require('../listener-interface')

class SigintListener extends ListenerInterface {
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
