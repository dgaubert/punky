'use strict'

const isMaster = require('cluster').isMaster
const LEADER = 'leader'
const SERVER = 'server'

class Role {
  constructor () {
    if (new.target === Role) {
      throw new Error('Role cannot be directly constructed')
    }
  }

  static isLeader (clusterOn) {
    return clusterOn && isMaster
  }

  static isServer (clusterOn) {
    return !this.isLeader(clusterOn)
  }

  static get (clusterOn) {
    return this.isLeader(clusterOn) ? LEADER : SERVER
  }
}

module.exports = Role
module.exports.LEADER = LEADER
module.exports.SERVER = SERVER
