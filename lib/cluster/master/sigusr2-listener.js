'use strict'

const ListenerInterface = require('../../listener-interface')

class Sigusr2Listener extends ListenerInterface {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen (run) {
    this.emitter.on('SIGUSR2', () => {
      this.logger.warn('SIGUSR2 received')
      run()
    })
  }
}

module.exports = Sigusr2Listener
