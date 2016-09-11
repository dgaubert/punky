'use strict'

const FactoryInterface = require('../factory-interface')
const App = require('./app')
const Express = require('express')
const AppMiddlewares = require('./middleware/app-middlewares')
const RequestIdMiddleware = require('./middleware/request-id-middleware')
const LogMiddleware = require('./middleware/log-middleware')
const LogRequestMiddleware = require('./middleware/log-request-middleware')
const ResponseTimeMiddleware = require('./middleware/response-time-middleware')
const MetricsMiddleware = require('./middleware/metrics-middleware')

class AppFactory extends FactoryInterface {
  static create (metrics, logger) {
    const express = Express()
    const middlewares = new AppMiddlewares()
      .add(new RequestIdMiddleware())
      .add(new LogMiddleware(logger))
      .add(new MetricsMiddleware(metrics, logger))
      .add(new LogRequestMiddleware())
      .add(new ResponseTimeMiddleware())

    return new App(express, middlewares)
  }
}

module.exports = AppFactory
