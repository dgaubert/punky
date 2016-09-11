'use strict'

const RunnerInterface = require('../runner-interface')

class Launcher extends RunnerInterface {
  constructor (target) {
    super()
    this.target = target
  }

  get app () {
    if (!this.target.isMaster()) {
      return this.target.server.app
    }
  }

  use (middleware) {
    if (!this.target.isMaster()) {
      this.target.use(middleware)
    }
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
