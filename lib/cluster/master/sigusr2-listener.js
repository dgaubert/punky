'use strict'

const ListenerInterface = require('../../listener-interface')

class Sigusr2Listener extends ListenerInterface {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen (reloadAllWorkers) {
    this.emitter.on('SIGUSR2', () => {
      this.logger.warn('SIGUSR2 received')
      return reloadAllWorkers()
    })
  }
}

module.exports = Sigusr2Listener
