'use strict'

const RunnerInterface = require('../runner-interface')

class Launcher extends RunnerInterface {
  constructor (target, processExitListeners) {
    super()
    this.target = target
    this.processExitListeners = processExitListeners
  }

  get app () {
    return this.target.app
  }

  get role () {
    return this.target.role
  }

  run () {
    this.processExitListeners.listen(failure => this.exit(failure))
    return this.target.run()
  }

  close () {
    this.processExitListeners.remove()
    return this.target.close()
  }

  exit (failure) {
    return this.target.exit(failure)
  }
}

module.exports = Launcher
