'use strict'

const Role = require('../role')
const ClusterInterface = require('../cluster-interface')

class Worker extends ClusterInterface {
  constructor (server, logger) {
    super()
    this.server = server
    this.logger = logger
  }

  static is (clusterOn) {
    return Role.isWorker(clusterOn)
  }

  get app () {
    return this.server.app
  }

  run () {
    return this.server.run()
      .then(listener => {
        this.logger.info('Ready')
        return listener
      })
      .catch(err => {
        this.logger.error('Failed on initializing', err)
        this.exit(1)
      })
  }

  close () {
    return this.server.close()
  }

  exit (failure) {
    return this.server.close()
      .then(() => {
        this.logger.warn('Exit')
        process.exit(failure || 0)
      })
      .catch(err => {
        this.logger.error('Failed on exit', err)
        process.exit(1)
      })
  }
}

module.exports = Worker
