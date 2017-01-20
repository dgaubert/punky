'use strict'

const Listener = require('../listener')

class SigtermListener extends Listener {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'SIGTERM'
  }

  listen (exit) {
    const sigtermListener = () => {
      this.logger.debug('termination signal (SIGTERM) received')
      exit()
    }

    this.handler = sigtermListener
    super.listen()
  }
}

module.exports = SigtermListener
