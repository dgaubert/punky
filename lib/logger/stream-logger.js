'use strict'

const LoggerInterface = require('../logger-interface')
const morgan = require('morgan')
const split = require('split')

class StreamLogger extends LoggerInterface {
  constructor (logger) {
    super()
    this.logger = logger

    // TODO: inject
    this.format = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] :response-time ":referrer" ":user-agent"'

    this.logger.stream = morgan(this.format, {
      stream: split().on('data', (message) => {
        this.logger.info(message)
      })
    })
  }

  log () {
    this.logger.log.apply(this.logger, arguments)
  }

  info () {
    this.logger.info.apply(this.logger, arguments)
  }

  warn () {
    this.logger.warn.apply(this.logger, arguments)
  }

  error () {
    this.logger.error.apply(this.logger, arguments)
  }

  middleware () {
    return this.logger.stream
  }
}

module.exports = StreamLogger
