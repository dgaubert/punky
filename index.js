'use strict'

const ServiceFactory = require('./lib/service-factory')

module.exports = function (router) {
  const serviceFactory = new ServiceFactory()
  return serviceFactory.create(router)
};
