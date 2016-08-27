'use strict'

const FactoryInterface = require('../factory-interface')
const App = require('./app')
const Express = require('express')
const AppMiddlewares = require('./middleware/app-middlewares')
const RequestIdMiddleware = require('./middleware/request-id-middleware')
const LogMiddleware = require('./middleware/log-middleware')
const LogRequestMiddleware = require('./middleware/log-request-middleware')
const LogResponseMiddleware = require('./middleware/log-response-middleware')
const RouterMiddleware = require('./middleware/router-middleware')

class AppFactory extends FactoryInterface {
  static create (router, logger) {
    const express = Express()

    const middlewares = new AppMiddlewares()
      .add(new RequestIdMiddleware())
      .add(new LogMiddleware(logger))
      .add(new LogRequestMiddleware())
      .add(new LogResponseMiddleware())
      .add(new RouterMiddleware(router))

    return new App(express, middlewares)
  }
}

module.exports = AppFactory
