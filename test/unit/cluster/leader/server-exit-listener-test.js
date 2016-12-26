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
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var listenerStub = this.sandbox.stub()

    this.serverExitListener.listen(listenerStub)
    this.emitter.emit('exit', 1, 1)

    assert.ok(loggerWarnStub.calledOnce)
    assert.ok(listenerStub.calledOnce)
    assert.ok(listenerStub.calledWithExactly(1, 1))
  })
})
