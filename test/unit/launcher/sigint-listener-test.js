'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const SigintListener = require(__lib + 'launcher/sigint-listener')

class Logger extends LoggerInterface {}

describe('sigint-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.sigintListener = new SigintListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGINT process event', () => {
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var listenerStub = this.sandbox.stub()

    this.sigintListener.listen(listenerStub)
    this.emitter.emit('SIGINT')

    assert.ok(loggerWarnStub.calledOnce)
    assert.ok(listenerStub.calledOnce)
  })
})
