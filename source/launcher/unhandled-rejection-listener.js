'use strict'

const Listener = require('../listener')

class UnhandledRejectionListener extends Listener {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen () {
    this.emitter.on('unhandledRejection', (reason, promise) => {
      promise
        .catch((err) => {
          this.logger.error('Unhandled promise rejection:', err.stack)
        })
    })
  }

}

module.exports = UnhandledRejectionListener
