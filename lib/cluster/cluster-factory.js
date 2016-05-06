'use strict'

const FactoryInterface = require('../factory-interface')
const WorkerFactory = require('./worker/worker-factory')
const MasterFactory = require('./master/master-factory')

class ClusterFactory extends FactoryInterface {
  static create (isMaster, router, port, logger) {
    return isMaster
      ? MasterFactory.create(logger)
      : WorkerFactory.create(router, port, logger)
  }

}

module.exports = ClusterFactory
