'use strict'

const isMaster = require('cluster').isMaster

class RoleManager {
  constructor (clusterOn) {
    this.clusterOn = clusterOn
  }

  role () {
    return this.isMaster() ? 'master' : 'worker'
  }

  isMaster () {
    return this.clusterOn && isMaster
  }
}

module.exports = RoleManager
