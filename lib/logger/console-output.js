'use strict'

const LoggerOutputInterface = require('./logger-output-interface')
const boleConsole = require('bole-console')

class ConsoleOutput extends LoggerOutputInterface {
  constructor () {
    super()
    this.level = 'debug'
    this.stream = boleConsole({
      timestamp: true,
      requestDetails: true,
      pid: true
    })
  }

  isAvailable () {
    return (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined)
  }
}

module.exports = ConsoleOutput
