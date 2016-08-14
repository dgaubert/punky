'use strict'

const ArgumentParser = require('../argv/argument-parser')
const RoleManager = require('../cluster/role-manager')

const argv = ArgumentParser.parse()
const roleManager = new RoleManager(argv.cluster)

module.exports = {
  name: argv.name,
  port: argv.port,
  cluster: {
    enabled: argv.cluster,
    role: roleManager.role(),
    isMaster: roleManager.isMaster()
  },
  logger: {
    path: argv.log
  }
}
