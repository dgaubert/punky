'use strict'

const Runner = require('./runner')

class Launcher extends Runner {
  constructor (target, listeners) {
    super()
    this.target = target

    if (listeners) {
      listeners.listen(failure => this.exit(failure))
    }
  }

  run () {
    return this.target.run()
  }

  exit (failure) {
    return this.target.exit(failure)
  }

}

module.exports = Launcher
