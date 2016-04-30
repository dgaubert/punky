'use strict'

const FactoryInterface = require('../factory-interface')
const Winston = require('winston').Logger
const Logger = require('./logger')
const StreamLogger = require('./stream-logger')
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')

class LoggerFactory extends FactoryInterface {
  create (role) {
    const wiston = new Winston({
      transports: [
        new ConsoleOutput(),
        new FileOutput()
      ]
    })

    const logger = new Logger(wiston, role)
    const streamLogger = new StreamLogger(logger)

    return streamLogger
  }
}

module.exports = LoggerFactory
