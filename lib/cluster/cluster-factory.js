'use strict'

const FactoryInterface = require('../factory-interface')
const isMaster = require('cluster').isMaster
const WorkerFactory = require('./worker/worker-factory')
const MasterFactory = require('./master/master-factory')

class ClusterFactory extends FactoryInterface {
  constructor (clusterOn) {
    super()
    this.role = clusterOn && isMaster ? 'master' : 'worker'
    this.masterFactory = new MasterFactory()
    this.workerFactory = new WorkerFactory()
  }

  create (app, port, logger) {
    return this.role === 'master'
      ? this.masterFactory.create(logger)
      : this.workerFactory.create(app, port, logger)
  }
}

module.exports = ClusterFactory
