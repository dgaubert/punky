'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const ListenerInterface = require(__lib + 'listener-interface')
const LogCommandListener = require(__lib + 'logger/log-command-listener')

describe('log-command-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logCommandListener = new LogCommandListener(this.emitter)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be an instace of ListenerInterface', () => {
    assert.ok(this.logCommandListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to message process event', () => {
    var reopenFileStreamsStub = this.sandbox.stub()

    this.logCommandListener.listen(reopenFileStreamsStub)
    this.emitter.emit('message', 'logger:reopen-file-streams')

    assert.ok(reopenFileStreamsStub.calledOnce)
  })

  it('.listen() should attach listener to message process event', () => {
    var reopenFileStreamsStub = this.sandbox.stub()

    this.logCommandListener.listen(reopenFileStreamsStub)
    this.emitter.emit('message', 'logger:wadus-command')

    assert.ok(!reopenFileStreamsStub.called)
  })
})
