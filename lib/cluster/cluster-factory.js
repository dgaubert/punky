'use strict'

const FactoryInterface = require('../factory-interface')
const WorkerFactory = require('./worker/worker-factory')
const MasterFactory = require('./master/master-factory')

class ClusterFactory extends FactoryInterface {
  static create (router, metrics, logger, options) {
    const isMaster = options.cluster.isMaster

    return isMaster
      ? MasterFactory.create(logger)
      : WorkerFactory.create(router, metrics, logger, options)
  }

}

module.exports = ClusterFactory
