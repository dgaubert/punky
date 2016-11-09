'use strict'

const LoggerOutputInterface = require('./logger-output-interface')

class ConsoleOutput extends LoggerOutputInterface {
  constructor () {
    super()
    this.level = 'debug'
    this.stream = process.stdout
  }

  isAvailable () {
    return (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined)
  }
}

module.exports = ConsoleOutput
