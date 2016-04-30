'use strict'

const FactoryInterface = require('../../factory-interface')
const Worker = require('./worker')
const Server = require('./server')

class WorkerFactory extends FactoryInterface {
  create (app, port, logger) {
    const server = new Server(app, port, logger)

    return new Worker(server, logger)
  }
}

module.exports = WorkerFactory
