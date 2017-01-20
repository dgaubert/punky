'use strict'

const assert = require('assert')
const sinon = require('sinon')
const MiddlewareInterface = require(__lib + 'http-server/app/middleware/middleware-interface')
const App = require(__lib + 'http-server/app/app')

class AppMiddlewares extends MiddlewareInterface {}

describe('app', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.provider = {
      use: () => {},
      listen: () => {},
      disable: () => {}
    }
    this.middlewares = new AppMiddlewares()
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should listen on port 3000', () => {
    this.provider.disable = this.sandbox.spy()
    this.provider.listen = this.sandbox.spy()
    this.middlewares.regist = this.sandbox.spy()

    this.app = new App(this.provider, this.middlewares)
    this.server = this.app.listen(3000)

    assert.ok(this.provider.disable.calledOnce)
    assert.ok(this.provider.listen.calledOnce)
    assert.ok(this.middlewares.regist.calledOnce)
  })
})
