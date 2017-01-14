'use strict'

const ErrorMessage = require('../utils/error-message')

class LoggerOutputInterface {
  constructor () {
    if (new.target === LoggerOutputInterface) {
      throw new Error(ErrorMessage.cannotConstructed(LoggerOutputInterface.name))
    }
  }

  isAvailable () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}

module.exports = LoggerOutputInterface
