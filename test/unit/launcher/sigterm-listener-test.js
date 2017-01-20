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
    this.logger.debug = this.sandbox.spy()
    const listenerSpy = this.sandbox.spy()

    this.sigtermListener.listen(listenerSpy)
    this.emitter.emit('SIGTERM')

    assert.ok(this.logger.debug.called)
    assert.ok(listenerSpy.calledOnce)
  })
})
