'use strict'

const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__source + 'logger-interface')
const UncaughtExceptionListener = require(__source + 'launcher/uncaught-exception-listener')

describe('uncaught-exception--listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new LoggerInterface()
    this.uncaughtExceptionListener = new UncaughtExceptionListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('listen() should attach listener to uncaughtException process event', () => {
    var loggerErrorStub = this.sandbox.stub(this.logger, 'error')
    var listenerStub = this.sandbox.stub()

    this.uncaughtExceptionListener.listen(listenerStub)
    this.emitter.emit('uncaughtException', new Error('Irrelevant error'))

    loggerErrorStub.calledOnce.should.be.equal(true)
    listenerStub.calledOnce.should.be.equal(true)
    listenerStub.calledWithExactly(1).should.be.equal(true)
  })
})
