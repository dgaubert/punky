'use strict'

const FactoryInterface = require('../factory-interface')
const express = require('express')
const AppMiddlewares = require('./middleware/app-middlewares')
const LogMiddleware = require('./middleware/log-middleware')
const RouterMiddleware = require('./middleware/router-middleware')

class AppFactory extends FactoryInterface {
  static create (router, logger) {
    const app = express()

    app.disable('x-powered-by')

    const appMiddlewares = new AppMiddlewares()
      .add(new LogMiddleware(logger))
      .add(new RouterMiddleware(router))

    appMiddlewares.registAll(app)

    return app
  }

}

module.exports = AppFactory
