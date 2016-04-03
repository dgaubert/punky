'use strict'

const ServiceFactory = require('./lib/service-factory')
const LoggerFactory = require('./logger/logger-factory')
const loggerFactory = new LoggerFactory()
const logger = loggerFactory.create()

module.exports = function (router) {
  const serviceFactory = new ServiceFactory()

  return serviceFactory.create(router, logger)
}

module.exports.logger = logger
