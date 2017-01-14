'use strict'

const ErrorMessage = require('../utils/error-message')
const RunnerInterface = require('../runner-interface')

class ClusterInterface extends RunnerInterface {
  constructor () {
    if (new.target === ClusterInterface) {
      throw new Error(ErrorMessage.cannotConstructed(ClusterInterface.name))
    }
    super()
  }

  static is () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}

module.exports = ClusterInterface
