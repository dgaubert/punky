'use strict'

const RunnerInterface = require('./runner-interface')

class Service extends RunnerInterface {
  constructor (launcher) {
    super()
    this.launcher = launcher
  }

  run () {
    return this.launcher.run()
  }

  close () {
    return this.launcher.close()
  }

  exit () {
    return this.launcher.exit()
  }
}

module.exports = Service
