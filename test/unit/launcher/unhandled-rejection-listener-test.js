'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const UnhandledRejectionListener = require(__lib + 'launcher/unhandled-rejection-listener')

class Logger extends LoggerInterface {}

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

  it('.listen() should attach listener to uncaughtException process event', done => {
    this.logger.error = this.sandbox.spy()
    this.logger.debug = this.sandbox.spy()

    var error = new Error('Irrelevant error')
    var rejectedPromise = Promise.reject(error)

    this.unhandledRejectionListener.listen()
    this.emitter.emit('unhandledRejection', error, rejectedPromise)

    process.nextTick(() => {
      assert.ok(this.logger.error.calledOnce)
      assert.ok(this.logger.debug.calledOnce)

      process.removeAllListeners('unhandledRejection')
      done()
    })
  })
})
