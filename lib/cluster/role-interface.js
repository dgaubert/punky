'use strict'

class RoleInterface {
  constructor () {
    if (new.target === RoleInterface) {
      throw new Error('RoleInterface cannot be directly constructed')
    }
  }

  isMaster () {
    throw new Error('Unimplemented method')
  }

  isWorker () {
    throw new Error('Unimplemented method')
  }
}

module.exports = RoleInterface
