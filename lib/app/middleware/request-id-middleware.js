'use strict'

const MiddlewareInterface = require('./middleware-interface')
const uuid = require('node-uuid')

class RequestIdMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use((req, res, next) => {
      req.requestId = uuid.v4()
      res.set('X-Request-Id', req.requestId)

      next()
    })
  }
}

module.exports = RequestIdMiddleware
