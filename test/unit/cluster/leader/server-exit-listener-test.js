'use strict'

const assert = require('assert')
const sinon = require('sinon')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const EventEmitter = require('events')
const ServerExitListener = require(__lib + 'cluster/leader/server-exit-listener')

class Logger extends LoggerInterface {}

describe('server-exit-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.serverExitListener = new ServerExitListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to cluster event', () => {
    this.logger.debug = this.sandbox.spy()
    var listenerSpy = this.sandbox.spy()

    this.serverExitListener.listen(listenerSpy)
    this.emitter.emit('exit', 1, 1)

    assert.ok(this.logger.debug.called)
    assert.ok(listenerSpy.calledOnce)
    assert.ok(listenerSpy.calledWithExactly(1, 1))
  })
})
