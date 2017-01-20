'use strict'

const Listener = require('../listener')

class UnhandledRejectionListener extends Listener {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'unhandledRejection'
  }

  listen () {
    const unhandledRejectionListener = (reason, promise) => {
      promise.catch(err => this.logger.error('Unhandled promise rejection:', err))
    }

    this.handler = unhandledRejectionListener
    super.listen()
  }
}

module.exports = UnhandledRejectionListener
