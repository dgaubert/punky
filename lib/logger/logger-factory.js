'use strict'

const config = require('config')
const FactoryInterface = require('../factory-interface')
const Logger = require('./logger')
const LoggerOutputs = require('./logger-outputs')
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')
const bole = require('bole')

class LoggerFactory extends FactoryInterface {
  static create () {
    const name = config.get('punky.name')
    const role = config.get('punky.cluster.role')
    const path = config.get('punky.logger.path')
    const loggerOutputs = new LoggerOutputs()
    const logger = bole(name)

    loggerOutputs.add(new ConsoleOutput())
    loggerOutputs.add(new FileOutput(path))
    loggerOutputs.linkTo(bole.output)

    return new Logger(logger(role))
  }
}

module.exports = LoggerFactory
