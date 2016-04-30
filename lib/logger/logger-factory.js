'use strict'

const FactoryInterface = require('../factory-interface')
const Winston = require('winston').Logger
const WistonLogger = require('./winston-logger')
const ConsoleOutput = require('./console-output')
const FileOutput = require('./file-output')
const morgan = require('morgan')
const split = require('split')

class LoggerFactory extends FactoryInterface {
  create (role) {
    const wiston = new Winston({
      transports: [
        new ConsoleOutput(),
        new FileOutput()
      ]
    })

    let logger = new WistonLogger(wiston, role)
    let format = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] :response-time ":referrer" ":user-agent"'

    logger.middleware = morgan(format, {
      stream: split().on('data', function (message) {
        logger.info(message)
      })
    })

    return logger
  }
}

module.exports = LoggerFactory
