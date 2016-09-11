'use strict'

const FactoryInterface = require('./factory-interface')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')
const MetricsFactory = require('./metrics/metrics-factory')
const LoggerFactory = require('./logger/logger-factory')
const Service = require('./service')

class ServiceFactory extends FactoryInterface {
  static create (options) {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)
    const target = ClusterFactory.create(metrics, logger, options)
    const launcher = LauncherFactory.create(target, logger)

    return new Service(launcher, metrics, logger)
  }
}

module.exports = ServiceFactory
