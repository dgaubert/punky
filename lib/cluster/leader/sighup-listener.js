'use strict'

const ListenerInterface = require('../../listener-interface')

class SighupListener extends ListenerInterface {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen (reopenAllLogFileStreams) {
    this.emitter.on('SIGHUP', () => {
      this.logger.info('SIGHUP received')
      return reopenAllLogFileStreams()
    })
  }
}

module.exports = SighupListener
