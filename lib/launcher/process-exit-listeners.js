'use strict'

class ProcessListeners extends Set {
  static get [Symbol.species] () {
    return Set
  }

  listen (exit) {
    for (let listener of this) {
      listener.listen(exit)
    }
  }
}

module.exports = ProcessListeners
