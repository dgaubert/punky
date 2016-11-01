'use strict'

const os = require('os')
const Role = require('../role')
const ClusterInterface = require('../cluster-interface')

class Master extends ClusterInterface {
  constructor (workerManager, logger) {
    super()
    this.workerManager = workerManager
    this.logger = logger
    this.numberOfWorkers = os.cpus().length
  }

  static is (clusterOn) {
    return Role.isMaster(clusterOn)
  }

  get app () {
    return { provider: null }
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
