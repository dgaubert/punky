'use strict'

const Listener = require('../listener')

class UnhandledRejectionListener extends Listener {
  constructor (logger) {
    super()
    this.logger = logger
  }

  listen () {
    process.on('unhandledRejection', (reason, promise) => {
      promise
        .catch((err) => {
          this.logger.error('Unhandled promise rejection:', err.stack)
        })
    })
  }

}

module.exports = UnhandledRejectionListener
