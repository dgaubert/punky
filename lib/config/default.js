'use strict'

const ArgumentParser = require('../argv/argument-parser')
const RoleManager = require('../cluster/role-manager')

const argv = ArgumentParser.parse()
const roleManager = new RoleManager(argv.cluster)

module.exports = {
  port: argv.port,
  cluster: {
    enabled: argv.cluster,
    role: roleManager.role(),
    isMaster: roleManager.isMaster()
  },
  logger: {
    path: argv.log,
    httpRequestFormat: ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] :response-time ":referrer" ":user-agent"'
  }
}
