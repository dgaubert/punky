'use strict'

class LoggerInterface {
  constructor () {
    if (new.target === LoggerInterface) {
      throw new Error('LoggerInterface cannot be directly constructed')
    }
  }

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
