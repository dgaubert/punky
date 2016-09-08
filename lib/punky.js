'use strict'

const defaultOptions = require('./config/default')
const ServiceFactory = require('./service-factory')
const MetricsFactory = require('./metrics/metrics-factory')
const LoggerFactory = require('./logger/logger-factory')

class Punky {
  constructor (options = {}) {
    this.options = Object.assign({}, defaultOptions, options)
    this.logger = LoggerFactory.create(this.options)
    this.metrics = MetricsFactory.create(this.logger, this.options)
  }

  use (router) {
    return ServiceFactory.create(router, this.metrics, this.logger, this.options)
  }
}

module.exports = Punky
