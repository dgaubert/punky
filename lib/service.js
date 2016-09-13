'use strict'

const RunnerInterface = require('./runner-interface')

class Service extends RunnerInterface {
  constructor (launcher, metrics, logger) {
    super()
    this.launcher = launcher
    this.metrics = metrics
    this.logger = logger
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
