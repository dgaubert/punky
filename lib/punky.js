'use strict'

const ServiceFactory = require('./service-factory')
const defaultOptions = require('./config/default')

class Punky {
  constructor (clientOptions = {}) {
    const options = Object.assign({}, defaultOptions, clientOptions)
    this.service = ServiceFactory.create(options)
  }

  get logger () {
    return this.service.logger.provider
  }

  get metrics () {
    return this.service.metrics.provider
  }

  get app () {
    return this.service.app.provider
  }

  use (middleware) {
    this.service.use(middleware)
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
