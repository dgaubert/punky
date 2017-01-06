'use strict'

const assert = require('assert')
const MiddlewareInterface = require(__lib + 'http-server/app/middleware/middleware-interface')

class Middleware extends MiddlewareInterface {}

describe('metrics-interface', () => {
  beforeEach(() => {
    this.middleware = new Middleware()
  })

  it('create interface directly with "new" should throw error', () => {
    assert.throws(() => new MiddlewareInterface(), 'MiddlewareInterface cannot be directly constructed')
  })

  it('.regist() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.middleware.regist(), 'Unimplemented method')
  })
})
