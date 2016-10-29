'use strict'

const RunnerInterface = require('../runner-interface')

class Launcher extends RunnerInterface {
  constructor (target) {
    super()
    this.target = target
  }

  get app () {
    return this.target.app
  }

  run () {
    return this.target.run()
  }

  close () {
    return this.target.close()
  }

  exit (failure) {
    return this.target.exit(failure)
  }
}

module.exports = Launcher
