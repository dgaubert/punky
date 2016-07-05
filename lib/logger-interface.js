'use strict'

class LoggerInterface {
  debug () {
    throw new Error('Unimplemented method')
  }

  log () {
    throw new Error('Unimplemented method')
  }

  info () {
    throw new Error('Unimplemented method')
  }

  warn () {
    throw new Error('Unimplemented method')
  }

  error () {
    throw new Error('Unimplemented method')
  }
}

module.exports = LoggerInterface
