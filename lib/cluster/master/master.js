'use strict'

const os = require('os')
const RunnerInterface = require('../../runner-interface')

class Master extends RunnerInterface {
  constructor (workerManager, logger) {
    super()
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

  exit (failure) {
    this.logger.warn('Exit')
    process.exit(failure || 0)
  }
}

module.exports = Master
