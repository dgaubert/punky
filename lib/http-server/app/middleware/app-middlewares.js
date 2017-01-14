'use strict'

const MiddlewareInterface = require('./middleware-interface')

class AppMiddlewares extends Set {
  add (middleware) {
    if (!(middleware instanceof MiddlewareInterface)) {
      throw new Error('Middleware must be a MiddlewareInterface instance')
    }

    super.add(middleware)

    return this
  }

  regist (app) {
    for (let middleware of this) {
      middleware.regist(app)
    }
  }
}

module.exports = AppMiddlewares
