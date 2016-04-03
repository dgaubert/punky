'use strict'

const FactoryInterface = require('../factory-interface')
const App = require('./app')

class AppFactory extends FactoryInterface {
  constructor() {
    super()
  }

  create(router) {
    const app = new App(router)

    return app
  }
}

module.exports = AppFactory
