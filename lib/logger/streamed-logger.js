'use strict'

const Logger = require('./logger')
const morgan = require('morgan')
const split = require('split')

module.exports = class StreamedLogger extends Logger {
  constructor (logger, role) {
    super(logger, role)

    // TODO: inject
    this.format = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] :response-time ":referrer" ":user-agent"'

    this.logger.stream = morgan(this.format, {
      stream: split().on('data', (message) => {
        this.logger.info(message)
      })
    })
  }

  middleware () {
    return this.logger.stream
  }
}
