'use strict'

const ListenerInterface = require('./listener-interface')

class Listeners extends Set {
  add (listener) {
    if (!(listener instanceof ListenerInterface)) {
      throw new Error('Listener must be a ListenerInterface instance')
    }

    super.add(listener)

    return this
  }

  listen (exit) {
    for (let listener of this) {
      listener.listen(exit)
    }
  }
}

module.exports = Listeners
