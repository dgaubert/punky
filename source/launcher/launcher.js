'use strict'

const Runner = require('../runner')

class Launcher extends Runner {
  constructor (target) {
    super()
    this.target = target
  }

  run () {
    return this.target.run()
  }

  exit (failure) {
    return this.target.exit(failure)
  }

}

module.exports = Launcher
