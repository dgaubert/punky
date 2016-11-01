'use strict'

const FactoryInterface = require('../../factory-interface')
const ServerFactory = require('../../server/server-factory')
const Worker = require('./worker')

class WorkerFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const server = ServerFactory.create(metrics, logger, options)
    return new Worker(server, logger)
  }

  static shouldCreate (clusterOn) {
    return Worker.is(clusterOn)
  }
}

module.exports = WorkerFactory
