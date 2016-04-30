'use strict'

const FactoryInterface = require('../factory-interface')
const Winston = require('winston').Logger
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')
const StreamedLogger = require('./streamed-logger')

class LoggerFactory extends FactoryInterface {
  create (role) {
    const logger = new Winston({
      transports: [
        new ConsoleOutput(),
        new FileOutput()
      ]
    })

    return new StreamedLogger(logger, role)
  }
}

module.exports = LoggerFactory
