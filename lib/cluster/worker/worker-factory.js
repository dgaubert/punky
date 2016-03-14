'use strict'

const FactoryInterface = require('../../factory-interface')
const Worker = require('./worker')
const Server = require('./server')

class WorkerFactory extends FactoryInterface {
  constructor () {
    super()
  }

  create (app, logger) {
    const server = new Server(app, logger)

    return new Worker(server, logger)
  }
}

module.exports = WorkerFactory
