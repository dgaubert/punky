'use strict'

const os = require('os')
const Runner = require('../../runner')

class Master extends Runner {
  constructor (workerManager, logger) {
    super()
    process.title = 'Master'
    this.workerManager = workerManager
    this.logger = logger
    this.numberOfWorkers = process.env.WORKERS || os.cpus().length
  }

  run () {
    for (let i = 0; i < this.numberOfWorkers; i++) {
      this.workerManager.fork()
    }

    this.logger.info('Ready')
  }

  exit (failure) {
    this.logger.warn('Exit')
    process.exit(failure || 0)
  }
}

module.exports = Master
