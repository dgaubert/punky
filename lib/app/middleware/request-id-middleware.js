'use strict'

const MiddlewareInterface = require('./middleware-interface')
const uuid = require('node-uuid')
const onHeaders = require('on-headers')

class RequestIdMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use((req, res, next) => {
      req.requestId = uuid.v4()

      onHeaders(res, function () {
        if (!this.getHeader('X-Request-Id')) {
          this.setHeader('X-Request-Id', req.requestId)
        }
      })

      next()
    })
  }
}

module.exports = RequestIdMiddleware
