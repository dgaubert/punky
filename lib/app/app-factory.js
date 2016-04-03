'use strict'

const FactoryInterface = require('../factory-interface')
const App = require('./app')

class AppFactory extends FactoryInterface {
  constructor() {
    super()
  }

  create(router) {
    const app = new App(batchRouter)

    return app
  }
}

module.exports = AppFactory
