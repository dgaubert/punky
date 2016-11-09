'use strict'

const FactoryInterface = require('../factory-interface')
const Logger = require('./logger')
const DisabledLogger = require('./disabled-logger')
const LoggerOutputs = require('./logger-outputs')
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')
const Role = require('../cluster/role')
const Bunyan = require('bunyan')
const SighupListener = require('./sighup-listener')

class LoggerFactory extends FactoryInterface {
  static create (options) {
    if (!options.logger.enabled) {
      return new DisabledLogger()
    }

    const name = options.name
    const role = Role.get(options.cluster.enabled)
    const path = options.logger.path

    const loggerOutputs = new LoggerOutputs()
      .add(new ConsoleOutput())
      .add(new FileOutput(path))

    const bunyan = Bunyan.createLogger({
      name: name,
      role: role,
      streams: loggerOutputs.toArray(),
      serializers: Bunyan.stdSerializers
    })

    const sighupListener = new SighupListener(process)

    return new Logger(bunyan, sighupListener)
  }
}

module.exports = LoggerFactory
