'use strict'

const sinon = require('sinon')
const Logger = require(__source + 'logger')
const UncaughtExceptionListener = require(__source + 'launcher/uncaught-exception-listener')

describe('uncaught-exception--listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.logger = new Logger()
    this.uncaughtExceptionListener = new UncaughtExceptionListener(this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('listen() should attach listener to uncaughtException process event', () => {
    var loggerErrorStub = this.sandbox.stub(this.logger, 'error')
    var listenerStub = this.sandbox.stub()
    process.removeAllListeners('uncaughtException')

    this.uncaughtExceptionListener.listen(listenerStub)
    process.emit('uncaughtException', new Error('Irrelevant error'))

    loggerErrorStub.calledOnce.should.be.equal(true)
    listenerStub.calledOnce.should.be.equal(true)
    listenerStub.calledWithExactly(1).should.be.equal(true)
    process.removeAllListeners('uncaughtException')
  })
})
