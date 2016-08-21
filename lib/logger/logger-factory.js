'use strict'

const FactoryInterface = require('../factory-interface')
const LoggerOutputs = require('./logger-outputs')
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')
const bole = require('bole')

class LoggerFactory extends FactoryInterface {
  static create (options) {
    const name = options.name
    const role = options.cluster.role
    const path = options.logger.path
    const loggerOutputs = new LoggerOutputs()

    const logger = bole([ name, role ].join(':'))

    loggerOutputs.add(new ConsoleOutput())
    loggerOutputs.add(new FileOutput(path))
    loggerOutputs.linkTo(bole.output)

    return logger
  }
}

module.exports = LoggerFactory
