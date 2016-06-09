'use strict'

const config = require('config')
const FactoryInterface = require('../factory-interface')
const Winston = require('winston').Logger
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')
const StreamedLogger = require('./streamed-logger')

class LoggerFactory extends FactoryInterface {
  static create () {
    const role = config.get('punky.cluster.role')
    const path = config.get('punky.logger.path')

    const transports = [ new FileOutput(path), new ConsoleOutput() ]
    const logger = new Winston({ transports })

    return new StreamedLogger(logger, role)
  }
}

module.exports = LoggerFactory
