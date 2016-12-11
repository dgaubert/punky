'use strict'

const ListenerInterface = require('../listener-interface')

class LogCommandListener extends ListenerInterface {
  constructor (emitter) {
    super()
    this.emitter = emitter
  }

  listen (reopenFileStreams) {
    this.emitter.on('message', command => command === 'logger:reopen-file-streams'
      ? reopenFileStreams()
      : undefined
    )
  }
}

module.exports = LogCommandListener
