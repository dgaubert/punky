'use strict'

const FactoryInterface = require('./factory-interface')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')

class ServiceFactory extends FactoryInterface {
  static create (isMaster, router, port, logger) {
    const target = ClusterFactory.create(isMaster, router, port, logger)

    return LauncherFactory.create(target, logger)
  }
}

module.exports = ServiceFactory
