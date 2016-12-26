'use strict'

const isMaster = require('cluster').isMaster
const MASTER = 'master'
const SERVER = 'server'

class Role {
  constructor () {
    if (new.target === Role) {
      throw new Error('Role cannot be directly constructed')
    }
  }

  static isMaster (clusterOn) {
    return clusterOn && isMaster
  }

  static isServer (clusterOn) {
    return !this.isMaster(clusterOn)
  }

  static get (clusterOn) {
    return this.isMaster(clusterOn) ? MASTER : SERVER
  }
}

module.exports = Role
module.exports.MASTER = MASTER
module.exports.SERVER = SERVER
