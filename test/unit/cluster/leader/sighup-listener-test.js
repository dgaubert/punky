'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const SighupListener = require(__lib + 'cluster/leader/sighup-listener')

class Logger extends LoggerInterface {}

describe('sigterm-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.sighupListener = new SighupListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGTERM process event', () => {
    this.logger.debug = this.sandbox.spy()
    const listenerStub = this.sandbox.stub().returns(Promise.resolve())

    this.sighupListener.listen(listenerStub)
    this.emitter.emit('SIGHUP')

    assert.ok(this.logger.debug.called)
    assert.ok(listenerStub.calledOnce)
  })
})
