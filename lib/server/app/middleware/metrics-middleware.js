'use strict'

const MiddlewareInterface = require('./middleware-interface')

class MetricsMiddleware extends MiddlewareInterface {
  constructor (metrics, logger) {
    super()
    this.metrics = metrics
    this.logger = logger
  }

  regist (app) {
    app.use((req, res, next) => {
      req.metrics = this.metrics
      next()
    })
  }
}

module.exports = MetricsMiddleware
