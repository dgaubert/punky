'use strict'

const ErrorMessage = require('./utils/error-message')

class ListenerInterface {
  constructor () {
    if (new.target === ListenerInterface) {
      throw new Error(ErrorMessage.cannotConstructed(ListenerInterface.name))
    }
  }

  listen () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  remove () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}

module.exports = ListenerInterface
