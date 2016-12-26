'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const SigtermListener = require(__lib + 'launcher/sigterm-listener')

class Logger extends LoggerInterface {}

describe('sigterm-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.sigtermListener = new SigtermListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGTERM process event', () => {
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var listenerStub = this.sandbox.stub()

    this.sigtermListener.listen(listenerStub)
    this.emitter.emit('SIGTERM')

    assert.ok(loggerWarnStub.calledOnce)
    assert.ok(listenerStub.calledOnce)
  })
})
