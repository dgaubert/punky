'use strict'

const ErrorMessage = require('../../../utils/error-message')

class MiddlewareInterface {
  constructor () {
    if (new.target === MiddlewareInterface) {
      throw new Error(ErrorMessage.cannotConstructed(MiddlewareInterface.name))
    }
  }

  regist () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}

module.exports = MiddlewareInterface
