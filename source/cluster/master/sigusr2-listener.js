'use strict'

const Listener = require('../../listener')

class Sigusr2Listener extends Listener {
  constructor (logger) {
    super()
    this.logger = logger
  }

  listen (run) {
    process.on('SIGUSR2', () => {
      this.logger.warn('SIGUSR2 received')
      run()
    })
  }
}

module.exports = Sigusr2Listener
