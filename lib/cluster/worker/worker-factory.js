'use strict'

const FactoryInterface = require('../../factory-interface')
const ServerFactory = require('../../server/server-factory')
const Worker = require('./worker')

class WorkerFactory extends FactoryInterface {
  static create (role, metrics, logger, options) {
    const server = ServerFactory.create(metrics, logger, options)

    return new Worker(role, server, logger)
  }
}

module.exports = WorkerFactory
