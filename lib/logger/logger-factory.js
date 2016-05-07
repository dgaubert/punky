'use strict'

const FactoryInterface = require('../factory-interface')
const Winston = require('winston').Logger
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')
const StreamedLogger = require('./streamed-logger')

class LoggerFactory extends FactoryInterface {
  static create (role) {
    const transports = [ new FileOutput(), new ConsoleOutput() ]
    const logger = new Winston({ transports })

    return new StreamedLogger(logger, role)
  }
}

module.exports = LoggerFactory
