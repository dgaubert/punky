'use strict'

const MiddlewareInterface = require('./middleware-interface')
const responseTime = require('response-time')

class LogMiddleware extends MiddlewareInterface {
  constructor (logger) {
    super()
    this.logger = logger
  }

  regist (app) {
    app.use(responseTime((req, res, time) => {
      this.logger.info(this.parse(req, res, time))
    }))
  }

  parse (req, res, time) {
    return {
      request: {
        method: req.method,
        url: req.url,
        headers: req.headers,
        remoteAddress: req.connection.remoteAddress,
        remotePort: req.connection.remotePort
      },
      response: {
        statusCode: res.statusCode,
        contentType: res.get('Content-Type'),
        contentLength: res.get('Content-Length'),
        elapsedTime: time
      }
    }
  }
}

module.exports = LogMiddleware
