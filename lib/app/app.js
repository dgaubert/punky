'use strict'

const express = require('express')
const ListenerInterface = require('../listener-interface')

class App extends ListenerInterface {
  constructor (router, logger) {
    super()
    this.router = router
    this.logger = logger
  }

  get application () {
    if (!this._application) {
      this._application = express()
    }

    return this._application
  }

  listen (port) {
    this.application.use('/', this.router)

    return this.application.listen(port)
  }
}

module.exports = App
