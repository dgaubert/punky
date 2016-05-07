'use strict'

const Logger = require('./logger')
const morgan = require('morgan')
const split = require('split')

class StreamedLogger extends Logger {
  constructor (logger, role) {
    super(logger, role)

    // TODO: inject from config
    const format = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] :response-time ":referrer" ":user-agent"'

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
