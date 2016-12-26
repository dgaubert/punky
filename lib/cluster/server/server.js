'use strict'

const Role = require('../role')
const ClusterInterface = require('../cluster-interface')

class Server extends ClusterInterface {
  constructor (httpServer, logger) {
    super()
    this.httpServer = httpServer
    this.logger = logger
  }

  static is (clusterOn) {
    return Role.isServer(clusterOn)
  }

  get role () {
    return Role.SERVER
  }

  get app () {
    return this.httpServer.app
  }

  run () {
    return this.httpServer.run()
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
    return this.httpServer.close()
  }

  exit (failure) {
    return this.httpServer.close()
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

module.exports = Server
