'use strict'

const FactoryInterface = require('./factory-interface')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')
const LoggerFactory = require('./logger/logger-factory')
const App = require('./app/app')
const ArgumentParser = require('./argv/argument-parser')

class ServiceFactory extends FactoryInterface {
  constructor () {
    super()
  }

  create (router) {
    const argv = ArgumentParser.parse()
    const clusterOn = argv.cluster
    const port = argv.port
    const role = ClusterFactory.role(clusterOn)
    const logger = LoggerFactory.create(role)
    const app = new App(router, logger)
    const target = ClusterFactory.create(clusterOn, app, port, logger)

    return LauncherFactory.create(target, logger)
  }
}

module.exports = ServiceFactory
