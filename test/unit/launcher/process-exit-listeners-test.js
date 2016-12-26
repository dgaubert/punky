'use strict'

const assert = require('assert')
const sinon = require('sinon')
const ListenerInterface = require(__lib + 'listener-interface')
const ProcessExitListeners = require(__lib + 'launcher/process-exit-listeners')

class Listener extends ListenerInterface {}

describe('process-exit-listeners', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.listener = new Listener()
    this.processExitListeners = new ProcessExitListeners().add(this.listener)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach the listener to all events added to the set', () => {
    var listenStub = this.sandbox.stub(this.listener, 'listen')

    this.processExitListeners.listen()

    assert.ok(listenStub.calledOnce)
  })
})
