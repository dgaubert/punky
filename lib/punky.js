'use strict'

const defaultOptions = require('./config/default')
const ServiceFactory = require('./service-factory')
const LoggerFactory = require('./logger/logger-factory')

class Punky {
  constructor (options = {}) {
    this.options = Object.assign({}, defaultOptions, options)
    this.logger = LoggerFactory.create(this.options)
  }

  use (router) {
    return ServiceFactory.create(router, this.logger, this.options)
  }
}

module.exports = Punky
