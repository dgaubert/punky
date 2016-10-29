'use strict'

const ArgumentParser = require('../argv/argument-parser')
const Role = require('../cluster/role')

const argv = ArgumentParser.parse()
const role = new Role(argv.cluster)

module.exports = {
  name: argv.name,
  port: argv.port,
  cluster: {
    enabled: argv.cluster,
    role: role.isMaster() ? 'master' : 'worker'
  },
  logger: {
    path: argv.log
  },
  metrics: {
    host: 'localhost',
    port: 8125,
    interval: 5000
  }
}
