'use strict'

const ErrorMessage = require('../utils/error-message')

class ParserInterface {
  constructor () {
    if (new.target === ParserInterface) {
      throw new Error(ErrorMessage.cannotConstructed(ParserInterface.name))
    }
  }

  parse () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}

module.exports = ParserInterface
