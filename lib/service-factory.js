'use strict'

const FactoryInterface = require('./factory-interface')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')
const App = require('./app/app')
const ArgumentParser = require('./argv/argument-parser')
const LoggerFactory = require('./logger/logger-factory')

class ServiceFactory extends FactoryInterface {
  constructor () {
    super()

    this.argv = new ArgumentParser().parse()
    this.clusterFactory = new ClusterFactory(this.argv.cluster)
    this.launcherFactory = new LauncherFactory()
    this.loggerFactory = new LoggerFactory()

    this.logger = new LoggerFactory().create(this.clusterFactory.role)
  }

  create (router) {
    const app = new App(router, this.logger)
    const target = this.clusterFactory.create(app, this.argv.port, this.logger)

    return this.launcherFactory.create(target, this.logger)
  }
}

module.exports = ServiceFactory
