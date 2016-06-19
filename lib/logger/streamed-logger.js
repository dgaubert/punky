'use strict'

const Logger = require('./logger')
const config = require('config')
const morgan = require('morgan')
const split = require('split')

class StreamedLogger extends Logger {
  constructor (logger, role) {
    super(logger, role)

    const format = config.get('punky.logger.httpRequestFormat')

    const loggerStream = split().on('data', (message) => {
      this.info(message)
    })

    this.stream = morgan(format, { stream: loggerStream })
  }

  middleware () {
    return this.stream
  }
}

module.exports = StreamedLogger
