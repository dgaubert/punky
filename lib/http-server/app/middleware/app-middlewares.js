'use strict'

const MiddlewareInterface = require('./middleware-interface')
const ErrorMessage = require('../../../utils/error-message')

class AppMiddlewares extends Set {
  add (middleware) {
    if (!(middleware instanceof MiddlewareInterface)) {
      throw new Error(ErrorMessage.mustBe(middleware.constructor.name, MiddlewareInterface.name))
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
