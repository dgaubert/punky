'use strict'

const FactoryInterface = require('../factory-interface')
const WorkerFactory = require('./worker/worker-factory')
const MasterFactory = require('./master/master-factory')
const RoleManager = require('./role-manager')

class ClusterFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const roleManager = new RoleManager(options.cluster.enabled)

    return roleManager.isMaster()
      ? MasterFactory.create(logger)
      : WorkerFactory.create(metrics, logger, options)
  }
}

module.exports = ClusterFactory
