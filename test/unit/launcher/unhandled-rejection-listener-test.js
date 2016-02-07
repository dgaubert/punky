'use strict'

const sinon = require('sinon')
const EventEmitter = require('events')
const Logger = require(__source + 'logger')
const UnhandledRejectionListener = require(__source + 'launcher/unhandled-rejection-listener')

describe('unhandled-rejection-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.unhandledRejectionListener = new UnhandledRejectionListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('listen() should attach listener to uncaughtException process event', (done) => {
    var loggerErrorStub = this.sandbox.stub(this.logger, 'error')
    var error = new Error('Irrelevant error')
    var rejectedPromise = Promise.reject(error)

    this.unhandledRejectionListener.listen()
    this.emitter.emit('unhandledRejection', error, rejectedPromise)

    process.nextTick(() => {
      loggerErrorStub.calledOnce.should.be.equal(true)
      process.removeAllListeners('unhandledRejection')
      done()
    })
  })
})
