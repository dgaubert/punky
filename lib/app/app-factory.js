'use strict'

const FactoryInterface = require('../factory-interface')
const express = require('express')
const AppMiddlewares = require('./middleware/app-middlewares')
const RequestIdMiddleware = require('./middleware/request-id-middleware')
const LogMiddleware = require('./middleware/log-middleware')
const LogRequestMiddleware = require('./middleware/log-request-middleware')
const LogResponseMiddleware = require('./middleware/log-response-middleware')
const RouterMiddleware = require('./middleware/router-middleware')

class AppFactory extends FactoryInterface {
  static create (router, logger) {
    const app = express()

    app.disable('x-powered-by')

    const appMiddlewares = new AppMiddlewares()
      .add(new RequestIdMiddleware())
      .add(new LogMiddleware(logger))
      .add(new LogRequestMiddleware())
      .add(new LogResponseMiddleware())
      .add(new RouterMiddleware(router))

    appMiddlewares.registAll(app)

    return app
  }

}

module.exports = AppFactory
