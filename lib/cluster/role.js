'use strict'

const isMaster = require('cluster').isMaster
const RoleInterface = require('./role-interface')

class Role extends RoleInterface {
  constructor (clusterOn) {
    super()
    this.clusterOn = clusterOn
  }

  isMaster () {
    return this.clusterOn && isMaster
  }

  isWorker () {
    return !this.isMaster()
  }
}

module.exports = Role
