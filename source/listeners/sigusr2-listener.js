'use strict'

const Listener = require('./listener')

class Sigusr2Listener extends Listener {
  constructor (logger) {
    super()
    this.logger = logger
  }

  listen (run) {
    this._listener = () => {
      this.logger.warn('SIGUSR2 received')
      process.removeListener('SIGUSR2', this._listener)
      run()
    }

    process.on('SIGUSR2', this._listener)
  }
}

module.exports = Sigusr2Listener
