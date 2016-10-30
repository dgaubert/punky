'use strict'

const MiddlewareInterface = require('./middleware-interface')

class RouterMiddleware extends MiddlewareInterface {
  constructor (router) {
    super()
    this.router = router
  }

  regist (app) {
    app.use('/', this.router)
  }
}

module.exports = RouterMiddleware
