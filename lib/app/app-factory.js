'use strict'

const FactoryInterface = require('../factory-interface')
const App = require('./app')

class AppFactory extends FactoryInterface {
  create (router, logger) {
    return new App(router, logger)
  }
}

module.exports = AppFactory
