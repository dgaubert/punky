'use strict'

const sinon = require('sinon')
const App = require(__source + 'app/app')

describe('app', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.provider = {
      use: () => {},
      listen: () => {},
      disable: () => {}
    }
    this.middlewares = {
      registAll: () => {}
    }
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should listen on port 3000', () => {
    var appDisableStub = this.sandbox.stub(this.provider, 'disable')
    var appListenStub = this.sandbox.stub(this.provider, 'listen')
    var middlewaresRegistAllStub = this.sandbox.stub(this.middlewares, 'registAll')

    this.app = new App(this.provider, this.middlewares)
    this.server = this.app.listen(3000)

    appDisableStub.calledOnce.should.be.equal(true)
    appListenStub.calledOnce.should.be.equal(true)
    middlewaresRegistAllStub.calledOnce.should.be.equal(true)
  })
})
