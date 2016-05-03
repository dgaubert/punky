'use strict'

const FactoryInterface = require('../factory-interface')
const WorkerFactory = require('./worker/worker-factory')
const MasterFactory = require('./master/master-factory')
const RoleManager = require('./role-manager')

class ClusterFactory extends FactoryInterface {
  constructor () {
    super()
  }

  static create (isMaster, router, port, logger) {
    return isMaster
      ? MasterFactory.create(logger)
      : WorkerFactory.create(router, port, logger)
  }

}

module.exports = ClusterFactory
