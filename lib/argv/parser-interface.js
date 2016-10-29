'use strict'

class ParserInterface {
  constructor () {
    if (new.target === ParserInterface) {
      throw new Error('ParserInterface cannot be directly constructed')
    }
  }

  parse () {
    throw new Error('Unimplemented method')
  }
}

module.exports = ParserInterface
