'use strict'

const ArgumentParser = require('../lib/argv/argument-parser')
const RoleManager = require('../lib/cluster/role-manager')

const argv = ArgumentParser.parse()
const roleManager = new RoleManager(argv.cluster)

module.exports = {
  port: argv.port,
  cluster: {
    isMaster: roleManager.isMaster(),
    role: roleManager.role(),
  },
  logger: {
    path: argv.log
  }
}
