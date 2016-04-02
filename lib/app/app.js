'use strict'

const express = require('express')
const ListenerInterface = require('../../listener-interface')

class App extends ListenerInterface {
  constructor (routers, errorMiddleware, logger) {
    super()
    this.application = express()
    this.routers = routers
    this.errorMiddleware = errorMiddleware
    this.logger = logger
  }

  listen (port) {
    return this.application.listen(port)
  }
}

module.exports = App
