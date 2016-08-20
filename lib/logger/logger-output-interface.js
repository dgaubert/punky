'use strict'

class LoggerOutputInterface {
  isAvailable () {
    throw new Error('Unimplemented method')
  }
}

module.exports = LoggerOutputInterface
