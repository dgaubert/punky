'use strict'

const config = require('config')
const FactoryInterface = require('../factory-interface')
const WorkerFactory = require('./worker/worker-factory')
const MasterFactory = require('./master/master-factory')

class ClusterFactory extends FactoryInterface {
  static create (router, logger) {
    const isMaster = config.get('punky.cluster.isMaster')

    return isMaster
      ? MasterFactory.create(logger)
      : WorkerFactory.create(router, logger)
  }

}

module.exports = ClusterFactory
