'use strict'

const FactoryInterface = require('../factory-interface')
const Logger = require('./logger')
const LoggerOutputs = require('./logger-outputs')
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')
const Role = require('../cluster/role')
const Bole = require('bole')

class LoggerFactory extends FactoryInterface {
  static create (options) {
    const name = options.name
    const role = Role.get(options.cluster.enabled)
    const path = options.logger.path
    const bole = Bole([ name, role ].join(':'))

    const loggerOutputs = new LoggerOutputs()
      .add(new ConsoleOutput())
      .add(new FileOutput(path))

    loggerOutputs.linkTo(Bole.output)

    return new Logger(bole)
  }
}

module.exports = LoggerFactory
