'use strict'

const ServiceFactory = require('./service-factory')
const defaultOptions = require('./config/default')

class Punky {
  constructor (clientOptions = {}) {
    const options = Object.assign({}, defaultOptions, clientOptions)
    this.service = ServiceFactory.create(options)
  }

  isMaster () {
    return this.service.launcher.target.isMaster()
  }

  get app () {
    if (this.service.launcher.target.isMaster()) {
      throw new Error('app is not available for master role')
    }

    return this.service.launcher.target.server.app.provider
  }

  get logger () {
    return this.service.logger.provider
  }

  get metrics () {
    return this.service.metrics.provider
  }

  run () {
    return this.service.run()
  }

  close () {
    return this.service.close()
  }

  exit () {
    return this.service.exit()
  }
}

module.exports = Punky
