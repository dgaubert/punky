'use strict'

const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__source + 'logger/logger-interface')
const SigintListener = require(__source + 'launcher/sigint-listener')

describe('sigint-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new LoggerInterface()
    this.sigintListener = new SigintListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGINT process event', () => {
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var listenerStub = this.sandbox.stub()

    this.sigintListener.listen(listenerStub)
    this.emitter.emit('SIGINT')

    loggerWarnStub.calledOnce.should.be.equal(true)
    listenerStub.calledOnce.should.be.equal(true)
  })
})
