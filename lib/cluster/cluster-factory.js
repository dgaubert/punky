'use strict'

const FactoryInterface = require('../factory-interface')
const WorkerFactory = require('./worker/worker-factory')
const MasterFactory = require('./master/master-factory')
const Role = require('./role')

class ClusterFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const role = new Role(options.cluster.enabled)

    return role.isMaster()
      ? MasterFactory.create(role, logger)
      : WorkerFactory.create(role, metrics, logger, options)
  }
}

module.exports = ClusterFactory
