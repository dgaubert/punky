'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const ListenerInterface = require(__lib + 'listener-interface')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const LogCommandListener = require(__lib + 'logger/log-command-listener')

class Logger extends LoggerInterface {}

describe('log-command-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.logCommandListener = new LogCommandListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be an instace of ListenerInterface', () => {
    assert.ok(this.logCommandListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to message process event', () => {
    this.logger.debug = this.sandbox.spy()
    const reopenFileStreamsSpy = this.sandbox.spy()

    this.logCommandListener.listen(reopenFileStreamsSpy)
    this.emitter.emit('message', 'logger:reopen-file-streams')

    assert.ok(this.logger.debug.calledOnce)
    assert.ok(reopenFileStreamsSpy.calledOnce)
  })

  it('.listen() should attach listener to message process event', () => {
    this.logger.debug = this.sandbox.spy()
    const reopenFileStreamsSpy = this.sandbox.spy()

    this.logCommandListener.listen(reopenFileStreamsSpy)
    this.emitter.emit('message', 'logger:wadus-command')

    assert.ok(this.logger.debug.calledOnce)
    assert.ok(!reopenFileStreamsSpy.called)
  })
})
