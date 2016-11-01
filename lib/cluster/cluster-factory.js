'use strict'

const FactoryInterface = require('../factory-interface')
const WorkerFactory = require('./worker/worker-factory')
const MasterFactory = require('./master/master-factory')
const ClusterClassFactories = new Set([ MasterFactory, WorkerFactory ])

class ClusterFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    for (let ClusterClassFactory of ClusterClassFactories) {
      if (ClusterClassFactory.shouldCreate(options.cluster.enabled)) {
        return ClusterClassFactory.create(metrics, logger, options)
      }
    }
  }
}

module.exports = ClusterFactory
