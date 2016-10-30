'use strict'

class AppMiddlewares extends Set {
  add (middleware) {
    super.add(middleware)
    return this
  }

  registAll (app) {
    for (let middleware of this) {
      middleware.regist(app)
    }
  }
}

module.exports = AppMiddlewares
