'use strict'

const MiddlewareInterface = require('./middleware-interface')
const uuid = require('node-uuid')

class LogMiddleware extends MiddlewareInterface {
  constructor (logger) {
    super()
    this.logger = logger
  }

  regist (app) {
    app.use((req, res, next) => {
      const requestId = uuid.v4()

      req.requestId = requestId
      req.log = this.logger.subLogger(requestId)
      next()
    })
  }
}

module.exports = LogMiddleware
