'use strict'

const FactoryInterface = require('./factory-interface')
const LoggerFactory = require('./logger/logger-factory')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')
const AppFactory = require('./app/app-factory')
const ArgumentParser = require('./argv/argument-parser')

class ServiceFactory extends FactoryInterface {
  constructor () {
    super()
    this.loggerFactory = new LoggerFactory()
    this.clusterFactory = new ClusterFactory()
    this.launcherFactory = new LauncherFactory()
    this.appFactory = new AppFactory()
  }

  create (router) {
    const argumentParser = new ArgumentParser()
    const options = argumentParser.parse()
    const clusterOn = options.cluster
    const port = options.port
    const app = this.appFactory.create(router)
    const logger = this.loggerFactory.create()
    const target = this.clusterFactory.create(clusterOn, app, port, logger)

    return this.launcherFactory.create(target, logger)
  }
}

module.exports = ServiceFactory
