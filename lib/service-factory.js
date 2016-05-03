'use strict'

const FactoryInterface = require('./factory-interface')
const ClusterFactory = require('./cluster/cluster-factory')
const LauncherFactory = require('./launcher/launcher-factory')
const LoggerFactory = require('./logger/logger-factory')
const ArgumentParser = require('./argv/argument-parser')
const RoleManager = require('./cluster/role-manager')

class ServiceFactory extends FactoryInterface {
  constructor () {
    super()
  }

  create (router) {
    const argv = ArgumentParser.parse()
    const clusterOn = argv.cluster
    const port = argv.port

    const roleManager = new RoleManager(clusterOn)
    const logger = LoggerFactory.create(roleManager.role())
    const target = ClusterFactory.create(roleManager.isMaster(), router, port, logger)

    return LauncherFactory.create(target, logger)
  }
}

module.exports = ServiceFactory
