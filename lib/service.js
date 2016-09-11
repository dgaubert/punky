'use strict'

const RunnerInterface = require('./runner-interface')

class Service extends RunnerInterface {
  constructor (launcher, metrics, logger) {
    super()
    this.launcher = launcher
    this.metrics = metrics
    this.logger = logger
  }

  get app () {
    return this.launcher.app
  }

  use (middleware) {
    this.launcher.use(middleware)
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
