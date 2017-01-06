'use strict'

const ListenerInterface = require('../listener-interface')

class ReopenFileStreamsListeners extends Set {
  static get [Symbol.species] () {
    return Set
  }

  add (listener) {
    if (!(listener instanceof ListenerInterface)) {
      throw new Error('Listener must be a ListenerInterface instance')
    }

    super.add(listener)

    return this
  }

  listen (reopenFileStreams) {
    for (let listener of this) {
      listener.listen(reopenFileStreams)
    }
  }
}

module.exports = ReopenFileStreamsListeners
