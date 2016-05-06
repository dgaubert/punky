'use strict'

const sinon = require('sinon')
const ListenerInterface = require(__source + 'listener-interface')
const ProcessExitListeners = require(__source + 'launcher/process-exit-listeners')

describe('process-exit-listeners', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.listener = new ListenerInterface()
    this.processExitListeners = new ProcessExitListeners().add(this.listener)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach the listener to all events added to the set', () => {
    var listenStub = this.sandbox.stub(this.listener, 'listen')

    this.processExitListeners.listenAll()

    listenStub.calledOnce.should.be.equal(true)
  })
})
