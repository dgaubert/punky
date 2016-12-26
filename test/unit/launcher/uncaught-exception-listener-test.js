'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const UncaughtExceptionListener = require(__lib + 'launcher/uncaught-exception-listener')

class Logger extends LoggerInterface {}

describe('uncaught-exception-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.uncaughtExceptionListener = new UncaughtExceptionListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to uncaughtException process event', () => {
    var loggerErrorStub = this.sandbox.stub(this.logger, 'error')
    var listenerStub = this.sandbox.stub()

    this.uncaughtExceptionListener.listen(listenerStub)
    this.emitter.emit('uncaughtException', new Error('Irrelevant error'))

    assert.ok(loggerErrorStub.calledOnce)
    assert.ok(listenerStub.calledOnce)
    assert.ok(listenerStub.calledWithExactly(1))
  })
})
