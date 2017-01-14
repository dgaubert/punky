'use strict'

const ErrorMessage = require('../utils/error-message')

class MetricsInterface {
  constructor () {
    if (new.target === MetricsInterface) {
      throw new Error(ErrorMessage.cannotConstructed(MetricsInterface.name))
    }
  }

  timing () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  gauge () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  logOnError () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  gaugeMemory () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}

module.exports = MetricsInterface
