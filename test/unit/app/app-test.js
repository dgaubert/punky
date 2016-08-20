'use strict'

const App = require(__source + 'app/app')
const LoggerInterface = require(__source + 'logger/logger-interface')
const Router = require('express').Router

describe('app', () => {
  beforeEach(() => {
    this.router = Router()
    this.logger = new LoggerInterface()
    this.logger.middleware = function () {
      return function () {}
    }
    this.app = new App(this.router, this.logger)
  })

  afterEach(() => {
    this.server.close()
  })

  it('.listen() should put itself listening on port 3000', () => {
    this.server = this.app.listen(3000)
    this.server.should.be.ok()
  })
})
