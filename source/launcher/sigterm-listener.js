'use strict'

const Listener = require('../listener')

class SigtermListener extends Listener {
  constructor (logger) {
    super()
    this.logger = logger
  }

  listen (exit) {
    process.once('SIGTERM', () => {
      this.logger.warn('SIGTERM received')
      exit()
    })
  }
}

module.exports = SigtermListener
