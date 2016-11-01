'use strict'

const isMaster = require('cluster').isMaster
const MASTER = 'master'
const WORKER = 'worker'

class Role {
  constructor () {
    if (new.target === Role) {
      throw new Error('Role cannot be directly constructed')
    }
  }

  static isMaster (clusterOn) {
    return clusterOn && isMaster
  }

  static isWorker (clusterOn) {
    return !this.isMaster(clusterOn)
  }

  static get (clusterOn) {
    return this.isMaster(clusterOn) ? MASTER : WORKER
  }
}

module.exports = Role
module.exports.MASTER = MASTER
module.exports.WORKER = WORKER
