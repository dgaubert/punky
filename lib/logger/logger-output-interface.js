'use strict'

class LoggerOutputInterface {
  constructor () {
    if (new.target === LoggerOutputInterface) {
      throw new Error('LoggerOutputInterface cannot be directly constructed')
    }
  }

  isAvailable () {
    throw new Error('Unimplemented method')
  }
}

module.exports = LoggerOutputInterface
