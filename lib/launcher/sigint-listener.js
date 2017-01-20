'use strict'

const Listener = require('../listener')

class SigintListener extends Listener {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'SIGINT'
  }

  listen (exit) {
    const sigintListener = () => {
      this.logger.debug('interrupt signal (SIGINT) received')
      exit()
    }

    this.handler = sigintListener
    super.listen()
  }
}

module.exports = SigintListener
