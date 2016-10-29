'use strict'

const os = require('os')
const RunnerInterface = require('../../runner-interface')

class Master extends RunnerInterface {
  constructor (role, workerManager, logger) {
    super()
    this.role = role
    this.workerManager = workerManager
    this.logger = logger
    this.numberOfWorkers = os.cpus().length
  }

  run () {
    for (let i = 0; i < this.numberOfWorkers; i++) {
      this.workerManager.fork()
    }

    this.logger.info('Ready')

    return Promise.resolve()
  }

  exit (failure = 0) {
    this.logger.warn('Exit')
    process.exit(failure)
  }
}

module.exports = Master
