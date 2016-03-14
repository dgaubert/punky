'use strict'

class ProcessListeners extends Set {
  listenAll (exit) {
    for (let listener of this) {
      listener.listen(exit)
    }
  }
}

module.exports = ProcessListeners
