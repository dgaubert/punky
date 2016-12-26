'use strict'

const FactoryInterface = require('../../factory-interface')
const HttpServerFactory = require('../../http-server/http-server-factory')
const Worker = require('./worker')

class WorkerFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const httpServer = HttpServerFactory.create(metrics, logger, options)
    return new Worker(httpServer, logger)
  }

  static shouldCreate (clusterOn) {
    return Worker.is(clusterOn)
  }
}

module.exports = WorkerFactory
