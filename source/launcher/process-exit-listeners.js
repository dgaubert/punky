'use strict'

class ProcessListeners extends Set {
  constructor () {
    super()
  }

  listenAll (exit) {
    for (let listener of this) {
      listener.listen(exit)
    }
  }
}

module.exports = ProcessListeners
