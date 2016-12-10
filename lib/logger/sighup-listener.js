'use strict'

const ListenerInterface = require('../listener-interface')

class SighupListener extends ListenerInterface {
  constructor (emitter) {
    super()
    this.emitter = emitter
  }

  listen (reopenFileStreams) {
    this.emitter.on('SIGHUP', () => {
      return reopenFileStreams()
    })
  }
}

module.exports = SighupListener
