'use strict'

const Factory = require('./factory')
const LoggerFactory = require('./logger/logger-factory')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')

class ServiceFactory extends Factory {
  constructor () {
    super()
    this.loggerFactory = new LoggerFactory()
    this.clusterFactory = new ClusterFactory()
    this.launcherFactory = new LauncherFactory()
  }

  create () {
    const logger = this.loggerFactory.create()
    const target = this.clusterFactory.create(logger)

    return this.launcherFactory.create(target, logger)
  }
}

module.exports = ServiceFactory
