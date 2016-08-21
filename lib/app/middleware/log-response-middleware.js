'use strict'

const MiddlewareInterface = require('./middleware-interface')
const responseTime = require('response-time')

class LogMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(responseTime((req, res, time) => {
      req.log.info({
        statusCode: res.statusCode,
        contentType: res.get('Content-Type'),
        contentLength: res.get('Content-Length'),
        elapsedTime: time
      })
    }))
  }
}

module.exports = LogMiddleware
