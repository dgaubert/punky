'use strict'

const Factory = require('../factory')
const Winston = require('winston').Logger
const WistonLogger = require('./winston-logger')
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')

class LoggerFactory extends Factory {
  constructor () {
    super()
  }

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
