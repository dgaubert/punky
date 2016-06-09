'use strict'

const FactoryInterface = require('./factory-interface')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')

class ServiceFactory extends FactoryInterface {
  static create (router, logger) {
    const target = ClusterFactory.create(router, logger)

    return LauncherFactory.create(target, logger)
  }
}

module.exports = ServiceFactory
