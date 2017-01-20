'use strict'

const assert = require('assert')
const sinon = require('sinon')
const AppMiddlewares = require(__lib + 'http-server/app/middleware/app-middlewares')
const MiddlewareInterface = require(__lib + 'http-server/app/middleware/middleware-interface')

class Middleware extends MiddlewareInterface {
  regist () {}
}

describe('logger-outputs', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this.appMiddlewares = new AppMiddlewares()
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be an instance of Set', () => {
    assert.ok(this.appMiddlewares instanceof Set)
  })

  it('.add() should add one middleware', () => {
    const middleware = new Middleware()

    this.appMiddlewares.add(middleware)

    assert.equal(this.appMiddlewares.size, 1)
  })

  it('.add() twice the same middleware should just add once', () => {
    const middleware = new Middleware()

    this.appMiddlewares.add(middleware)
    this.appMiddlewares.add(middleware)

    assert.equal(this.appMiddlewares.size, 1)
  })

  it('.add() should throw error if element to add is not a middleware', () => {
    const notMiddleware = {}

    assert.throws(() => this.appMiddlewares.add(notMiddleware), 'Middleware must be a MiddlewareInterface instance')
  })

  it('.regist() should call .regist() of every middleware', () => {
    const middleware = new Middleware()
    middleware.regist = this.sandbox.spy()

    this.appMiddlewares.add(middleware)

    this.appMiddlewares.regist()

    assert.ok(middleware.regist.calledOnce)
  })
})
