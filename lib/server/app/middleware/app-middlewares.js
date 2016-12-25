'use strict'

class AppMiddlewares extends Set {
  static get [Symbol.species] () {
    return Set
  }

  regist (app) {
    for (let middleware of this) {
      middleware.regist(app)
    }
  }
}

module.exports = AppMiddlewares
