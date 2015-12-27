'use strict'

const Listener = require('./listener')

class ProcessListenerIterator extends Listener {
  constructor () {
    super()
    this._listeners = []
  }

  add (listener) {
    this._listeners.push(listener)

    return this
  }

  listen (exit) {
    for (var listener of this._listeners) {
      listener.listen(exit)
    }
  }
}

module.exports = ProcessListenerIterator
