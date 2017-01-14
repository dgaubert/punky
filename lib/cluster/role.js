'use strict'

const isMaster = require('cluster').isMaster
const ErrorMessage = require('../utils/error-message')
const LEADER = 'leader'
const SERVER = 'server'

class Role {
  constructor () {
    if (new.target === Role) {
      throw new Error(ErrorMessage.cannotConstructed(Role.name))
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
