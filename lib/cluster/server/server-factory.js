'use strict'

const FactoryInterface = require('../../factory-interface')
const HttpServerFactory = require('../../http-server/http-server-factory')
const Server = require('./server')

class ServerFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const httpServer = HttpServerFactory.create(metrics, logger, options)
    return new Server(httpServer, logger)
  }

  static shouldCreate (clusterOn) {
    return Server.is(clusterOn)
  }
}

module.exports = ServerFactory
