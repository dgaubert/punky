'use strict'

const assert = require('assert')
const sinon = require('sinon')
const ListenerInterface = require(__lib + 'listener-interface')
const ProcessExitListeners = require(__lib + 'launcher/process-exit-listeners')

class Listener extends ListenerInterface {}

describe('process-exit-listeners', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.processExitListeners = new ProcessExitListeners()
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be an instance of Set', () => {
    assert.ok(this.processExitListeners instanceof Set)
  })

  it('.add() should add one listener', () => {
    const listener = new Listener()

    this.processExitListeners.add(listener)

    assert.equal(this.processExitListeners.size, 1)
  })

  it('.add() twice the same listener should just add once', () => {
    const listener = new Listener()

    this.processExitListeners.add(listener)
    this.processExitListeners.add(listener)

    assert.equal(this.processExitListeners.size, 1)
  })

  it('.add() should throw error if element to add is not a middleware', () => {
    const notListener = {}

    assert.throws(() => this.processExitListeners.add(notListener), 'Listener must be a ListenerInterface instance')
  })

  it('.regist() should call .listen() of every listener', () => {
    const listener = new Listener()
    const listenerListenStub = this.sandbox.stub(listener, 'listen')

    this.processExitListeners.add(listener)

    this.processExitListeners.listen()

    assert.ok(listenerListenStub.calledOnce)
  })
})
