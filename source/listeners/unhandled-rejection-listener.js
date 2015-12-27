'use strict'

const Listener = require('./listener')

class UnhandledRejectionListener extends Listener {
  constructor(logger) {
    super()
    this.logger = logger
  }

  listen() {
    this._listener = (reason, promise) => {
      promise
        .catch((err) => {
          this.logger.error('Unhandled promise rejection:', err.stack)
        })
    }

    process.on('unhandledRejection', this._listener)
  }

}

module.exports = UnhandledRejectionListener
