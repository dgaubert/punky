'use strict'

const FactoryInterface = require('../factory-interface')
const Winston = require('winston').Logger
const WistonLogger = require('./winston-logger')
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')

class LoggerFactory extends FactoryInterface {
  create () {
    const wiston = new Winston({
      transports: [
        new ConsoleOutput(),
        new FileOutput()
      ]
    })

    return new WistonLogger(wiston)
  }
}

module.exports = LoggerFactory
