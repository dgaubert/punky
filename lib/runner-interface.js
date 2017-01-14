'use strict'

const ErrorMessage = require('./utils/error-message')

class RunnerInterface {
  constructor () {
    if (new.target === RunnerInterface) {
      throw new Error(ErrorMessage.cannotConstructed(RunnerInterface.name))
    }
  }

  run () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  close () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  exit () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}

module.exports = RunnerInterface
