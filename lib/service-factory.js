'use strict'

const FactoryInterface = require('./factory-interface')
const LoggerFactory = require('./logger/logger-factory')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')
const App = require('./app/app')

class ServiceFactory extends FactoryInterface {
  constructor () {
    super()
    this.loggerFactory = new LoggerFactory()
    this.clusterFactory = new ClusterFactory()
    this.launcherFactory = new LauncherFactory()
  }

  create (isCluster, port) {
    const app = new App()
    const logger = this.loggerFactory.create()
    const target = this.clusterFactory.create(isCluster, app, port, logger)

    return this.launcherFactory.create(target, logger)
  }
}

module.exports = ServiceFactory
