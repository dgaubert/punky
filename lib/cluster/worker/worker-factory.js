'use strict'

const FactoryInterface = require('../../factory-interface')
const Worker = require('./worker')
const Server = require('./server')
const App = require('../../app/app')

class WorkerFactory extends FactoryInterface {
  static create (router, logger) {
    const app = new App(router, logger)
    const server = new Server(app, logger)

    return new Worker(server, logger)
  }
}

module.exports = WorkerFactory
