'use strict'

const sinon = require('sinon')
const LoggerInterface = require(__source + 'logger/logger-interface')
const Logger = require(__source + 'logger/logger')

describe('logger', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this.provider = new LoggerInterface()
    this.logger = new Logger(this.provider)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.debug() should log at debug level', () => {
    const loggerLogStub = this.sandbox.stub(this.provider, 'debug')
    const args = [ 'debug', 'wadus message' ]

    this.logger.debug(...args)

    loggerLogStub.calledWithExactly(...args).should.equal(true)
  })

  it('.log() should log', () => {
    const loggerLogStub = this.sandbox.stub(this.provider, 'info')
    const args = [ 'info', 'wadus message' ]

    this.logger.log(...args)

    loggerLogStub.calledWithExactly(...args).should.equal(true)
  })

  it('.info() should log at info level', () => {
    const loggerInfoStub = this.sandbox.stub(this.provider, 'info')
    const args = [ 'wadus message' ]

    this.logger.info(...args)

    loggerInfoStub.calledWithExactly(...args).should.equal(true)
  })

  it('.warn() should log at warn level', () => {
    const loggerWarnStub = this.sandbox.stub(this.provider, 'warn')
    const args = [ 'wadus message' ]

    this.logger.warn(...args)

    loggerWarnStub.calledWithExactly(...args).should.equal(true)
  })

  it('.error() should log at error level', () => {
    const loggerErrorStub = this.sandbox.stub(this.provider, 'error')
    const args = [ 'wadus message' ]

    this.logger.error(...args)

    loggerErrorStub.calledWithExactly(...args).should.equal(true)
  })
})
