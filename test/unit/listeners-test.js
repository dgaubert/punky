'use strict'

const assert = require('assert')
const sinon = require('sinon')
const ListenerInterface = require(__lib + 'listener-interface')
const Listeners = require(__lib + 'listeners')

class Listener extends ListenerInterface {}

describe('listeners', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.listeners = new Listeners()
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be an instance of Set', () => {
    assert.ok(this.listeners instanceof Set)
  })

  it('.add() should add one listener', () => {
    const listener = new Listener()

    this.listeners.add(listener)

    assert.equal(this.listeners.size, 1)
  })

  it('.add() twice the same listener should just add once', () => {
    const listener = new Listener()

    this.listeners.add(listener)
    this.listeners.add(listener)

    assert.equal(this.listeners.size, 1)
  })

  it('.add() should throw error if element to add is not a listener', () => {
    const notListener = {}

    assert.throws(() => this.listeners.add(notListener), 'Listener must be a ListenerInterface instance')
  })

  it('.regist() should call .listen() of every listener', () => {
    const listener = new Listener()
    listener.listen = this.sandbox.spy()

    this.listeners.add(listener)

    this.listeners.listen()

    assert.ok(listener.listen.calledOnce)
  })
})
