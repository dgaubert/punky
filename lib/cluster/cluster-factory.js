'use strict'

const FactoryInterface = require('../factory-interface')
const isMaster = require('cluster').isMaster
const WorkerFactory = require('./worker/worker-factory')
const MasterFactory = require('./master/master-factory')

class ClusterFactory extends FactoryInterface {
  constructor () {
    super()
  }

  static create (clusterOn, app, port, logger) {
    return this.role(clusterOn) === 'master'
      ? MasterFactory.create(logger)
      : WorkerFactory.create(app, port, logger)
  }

  static role (clusterOn) {
    return (clusterOn && isMaster) ? 'master' : 'worker'
  }
}

module.exports = ClusterFactory
