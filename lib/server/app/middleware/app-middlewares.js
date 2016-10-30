'use strict'

const MiddlewareInterface = require('./middleware-interface')

class AppMiddlewares extends MiddlewareInterface {
  constructor () {
    super()
    this.middlewares = new Set()
  }

  add (middleware) {
    this.middlewares.add(middleware)
    return this
  }

  regist (app) {
    for (let middleware of this.middlewares) {
      middleware.regist(app)
    }
  }
}

module.exports = AppMiddlewares
