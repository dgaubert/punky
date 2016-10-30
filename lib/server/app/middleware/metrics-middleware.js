'use strict'

const MiddlewareInterface = require('./middleware-interface')

class MetricsMiddleware extends MiddlewareInterface {
  constructor (metrics) {
    super()
    this.metrics = metrics
  }

  regist (app) {
    app.use((req, res, next) => {
      req.metrics = this.metrics
      next()
    })
  }
}

module.exports = MetricsMiddleware
