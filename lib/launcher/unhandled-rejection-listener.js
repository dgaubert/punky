'use strict'

const ListenerInterface = require('../listener-interface')

class UnhandledRejectionListener extends ListenerInterface {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen () {
    this.emitter.on('unhandledRejection', (reason, promise) => {
      promise.catch(err => this.logger.error('Unhandled promise rejection:', err))
    })
  }

}

module.exports = UnhandledRejectionListener
