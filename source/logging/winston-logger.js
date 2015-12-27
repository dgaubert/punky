'use strict'

const Logger = require('./logger')
const cluster = require('cluster')
const Winston = require('winston').Logger

class WinstonLogger extends Logger {
  constructor(transports) {
    super()
    this.logger = new Winston({
      transports: transports
    })

    this.logger.rewriters.push((level, message, meta) => {
      meta.role = process.title
      meta.pid = process.pid

      return meta
    })
  }

  log() {
    this.logger.log.apply(this.logger, arguments)
  }

  info() {
    this.logger.info.apply(this.logger, arguments)
  }

  warn() {
    this.logger.warn.apply(this.logger, arguments)
  }

  error() {
    this.logger.error.apply(this.logger, arguments)
  }
}

module.exports = WinstonLogger
