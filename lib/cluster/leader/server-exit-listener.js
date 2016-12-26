'use strict'

const ListenerInterface = require('../../listener-interface')

class ServerExitListener extends ListenerInterface {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen (run) {
    this.emitter.on('exit', (server, code) => {
      this.logger.warn('EXIT received')
      return run(server, code)
    })
  }
}

module.exports = ServerExitListener
