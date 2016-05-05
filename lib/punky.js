'use strict';

const ServiceFactory = require('./service-factory')
const LoggerFactory = require('./logger/logger-factory')
const ArgumentParser = require('./argv/argument-parser')
const RoleManager = require('./cluster/role-manager')

class Punky {
  constructor () {
    this.argv = ArgumentParser.parse()

    const roleManager = new RoleManager(this.argv.cluster)

    this.role = roleManager.role()
    this.isMaster = roleManager.isMaster()
    this.logger = LoggerFactory.create(this.role)
  }

  use (router) {
    const port = this.argv.port
    const isMaster = this.isMaster
    const logger = this.logger

    return ServiceFactory.create(isMaster, router, port, logger)
  }
}

module.exports = Punky;
