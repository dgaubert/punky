'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__source + 'logger/logger-interface')
const UnhandledRejectionListener = require(__source + 'launcher/unhandled-rejection-listener')

describe('unhandled-rejection-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new LoggerInterface()
    this.unhandledRejectionListener = new UnhandledRejectionListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to uncaughtException process event', (done) => {
    var loggerErrorStub = this.sandbox.stub(this.logger, 'error')
    var error = new Error('Irrelevant error')
    var rejectedPromise = Promise.reject(error)

    this.unhandledRejectionListener.listen()
    this.emitter.emit('unhandledRejection', error, rejectedPromise)

    process.nextTick(() => {
      assert.ok(loggerErrorStub.calledOnce)
      process.removeAllListeners('unhandledRejection')
      done()
    })
  })
})
