'use strict'

const RunnerInterface = require('../runner-interface')

class ClusterInterface extends RunnerInterface {
  constructor () {
    if (new.target === ClusterInterface) {
      throw new Error('ClusterInterface cannot be directly constructed')
    }
    super()
  }

  static is () {
    throw new Error('Unimplemented method')
  }
}

module.exports = ClusterInterface
