'use strict'

const ListenerInterface = require('../listener-interface')

class ProcessListeners extends ListenerInterface {
  constructor () {
    super()
    this.listeners = new Set()
  }

  listen (exit) {
    for (let listener of this.listeners) {
      listener.listen(exit)
    }
  }

  add (listener) {
    this.listeners.add(listener)
    return this
  }
}

module.exports = ProcessListeners
