'use strict'

const FactoryInterface = require('../factory-interface')
const Logger = require('./logger')
const DisabledLogger = require('./disabled-logger')
const LoggerOutputs = require('./logger-outputs')
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')
const Role = require('../cluster/role')
const Bole = require('bole')

class LoggerFactory extends FactoryInterface {
  static create (options) {
    if (!options.logger.enabled) {
      return new DisabledLogger()
    }

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
