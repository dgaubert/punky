'use strict'

const assert = require('assert')
const sinon = require('sinon')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const ListenerInterface = require(__lib + 'listener-interface')
const Logger = require(__lib + 'logger/logger')

class LoggerProvider extends LoggerInterface {}
class SighupListener extends ListenerInterface {}

describe('logger', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this.provider = new LoggerProvider()
    this.sighupListener = new SighupListener()
    this.sighupListenerListenStub = this.sandbox.stub(this.sighupListener, 'listen')
    this.logger = new Logger(this.provider, this.sighupListener)
  })

  afterEach(() => {
    assert.ok(this.sighupListenerListenStub.calledOnce)
    this.sandbox.restore()
  })

  it('.debug() should log at debug level', () => {
    this.provider.debug = this.sandbox.spy()
    const args = [ 'debug', 'wadus message' ]

    this.logger.debug(...args)

    assert.ok(this.provider.debug.calledWithExactly(...args))
  })

  it('.log() should log', () => {
    this.provider.info = this.sandbox.spy()
    const args = [ 'info', 'wadus message' ]

    this.logger.log(...args)

    assert.ok(this.provider.info.calledWithExactly(...args))
  })

  it('.info() should log at info level', () => {
    this.provider.info = this.sandbox.spy()
    const args = [ 'wadus message' ]

    this.logger.info(...args)

    assert.ok(this.provider.info.calledWithExactly(...args))
  })

  it('.warn() should log at warn level', () => {
    this.provider.warn = this.sandbox.spy()
    const args = [ 'wadus message' ]

    this.logger.warn(...args)

    assert.ok(this.provider.warn.calledWithExactly(...args))
  })

  it('.error() should log at error level', () => {
    this.provider.error = this.sandbox.spy()
    const args = [ 'wadus message' ]

    this.logger.error(...args)

    assert.ok(this.provider.error.calledWithExactly(...args))
  })
})
