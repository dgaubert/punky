'use strict'

const Listener = require('../../listener')

class Sigusr2Listener extends Listener {
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
