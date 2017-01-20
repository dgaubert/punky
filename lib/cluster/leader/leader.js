'use strict'

const os = require('os')
const Role = require('../role')
const ClusterInterface = require('../cluster-interface')

class Leader extends ClusterInterface {
  constructor (serverManager, logger) {
    super()
    this.serverManager = serverManager
    this.logger = logger
    this.numberOfServers = os.cpus().length
  }

  static is (clusterOn) {
    return Role.isLeader(clusterOn)
  }

  get role () {
    return Role.LEADER
  }

  get app () {
    return { provider: null }
  }

  run () {
    this.serverManager.attachListeners()

    for (let i = 0; i < this.numberOfServers; i++) {
      this.serverManager.fork()
    }

    this.logger.info('Ready')

    return Promise.resolve()
  }

  exit (failure = 0) {
    this.logger.debug('Exit')
    this.serverManager.removeListeners()
    process.exit(failure)
  }
}

module.exports = Leader
