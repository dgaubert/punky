'use strict'

const ErrorMessage = require('./utils/error-message')

class FactoryInterface {
  constructor () {
    if (new.target === FactoryInterface) {
      throw new Error(ErrorMessage.cannotConstructed(FactoryInterface.name))
    }
  }

  static create () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}

module.exports = FactoryInterface
