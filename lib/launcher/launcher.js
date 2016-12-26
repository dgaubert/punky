'use strict'

const RunnerInterface = require('../runner-interface')

class Launcher extends RunnerInterface {
  constructor (target, processExitListeners) {
    super()
    this.target = target
    processExitListeners.listen(failure => this.exit(failure))
  }

  get app () {
    return this.target.app
  }

  get role () {
    return this.target.role
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
