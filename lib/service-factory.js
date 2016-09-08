'use strict'

const FactoryInterface = require('./factory-interface')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')

class ServiceFactory extends FactoryInterface {
  static create (router, metrics, logger, options) {
    const target = ClusterFactory.create(router, metrics, logger, options)

    return LauncherFactory.create(target, logger)
  }
}

module.exports = ServiceFactory
