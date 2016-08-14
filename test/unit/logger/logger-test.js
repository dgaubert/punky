'use strict'

const sinon = require('sinon')
const LoggerInterface = require(__source + 'logger-interface')
const Logger = require(__source + 'logger/logger')

describe('logger', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this._logger = new LoggerInterface()
    this.logger = new Logger(this._logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.log() should log', () => {
    const loggerLogStub = this.sandbox.stub(this._logger, 'info')
    const args = [ 'info', 'wadus message' ]

    this.logger.log(...args)

    loggerLogStub.calledWithExactly(...args).should.equal(true)
  })

  it('.info() should log at info level', () => {
    const loggerInfoStub = this.sandbox.stub(this._logger, 'info')
    const args = [ 'wadus message' ]

    this.logger.info(...args)

    loggerInfoStub.calledWithExactly(...args).should.equal(true)
  })

  it('.warn() should log at warn level', () => {
    const loggerWarnStub = this.sandbox.stub(this._logger, 'warn')
    const args = [ 'wadus message' ]

    this.logger.warn(...args)

    loggerWarnStub.calledWithExactly(...args).should.equal(true)
  })

  it('.error() should log at error level', () => {
    const loggerErrorStub = this.sandbox.stub(this._logger, 'error')
    const args = [ 'wadus message' ]

    this.logger.error(...args)

    loggerErrorStub.calledWithExactly(...args).should.equal(true)
  })
})
