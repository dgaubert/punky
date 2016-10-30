'use strict'

const FactoryInterface = require('../factory-interface')
const App = require('./app/app')
const Express = require('express')
const AppMiddlewares = require('./app/middleware/app-middlewares')
const RequestIdMiddleware = require('./app/middleware/request-id-middleware')
const LogMiddleware = require('./app/middleware/log-middleware')
const LogRequestMiddleware = require('./app/middleware/log-request-middleware')
const ResponseTimeMiddleware = require('./app/middleware/response-time-middleware')
const MetricsMiddleware = require('./app/middleware/metrics-middleware')
const Server = require('./server')

class ServerFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const port = options.port
    const express = Express()

    const middlewares = new AppMiddlewares()
      .add(new RequestIdMiddleware())
      .add(new LogMiddleware(logger))
      .add(new MetricsMiddleware(metrics, logger))
      .add(new LogRequestMiddleware())
      .add(new ResponseTimeMiddleware())

    const app = new App(express, middlewares)

    return new Server(app, port, logger)
  }
}

module.exports = ServerFactory
