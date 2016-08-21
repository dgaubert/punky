'use strict'

const FactoryInterface = require('../../factory-interface')
const AppFactory = require('../../app/app-factory')
const Worker = require('./worker')
const Server = require('./server')

class WorkerFactory extends FactoryInterface {
  static create (router, logger, options) {
    const port = options.port
    const app = AppFactory.create(router, logger)
    const server = new Server(app, port, logger)

    return new Worker(server, logger)
  }
}

module.exports = WorkerFactory
