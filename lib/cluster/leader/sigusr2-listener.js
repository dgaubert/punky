'use strict'

const Listener = require('../../listener')

class Sigusr2Listener extends Listener {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'SIGUSR2'
  }

  listen (reloadAllServers) {
    const sigusr2Listener = () => {
      this.logger.debug('signal user (SIGUSR2) received')
      return reloadAllServers()
    }

    this.handler = sigusr2Listener
    super.listen()
  }
}

module.exports = Sigusr2Listener
