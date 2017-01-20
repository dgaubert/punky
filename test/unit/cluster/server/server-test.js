'use strict'

const assert = require('assert')
const sinon = require('sinon')
const RunnerInterface = require(__lib + 'runner-interface')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const Server = require(__lib + 'cluster/server/server')

class HttpServer extends RunnerInterface {}
class Logger extends LoggerInterface {}

describe('worker', function () {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.httpServer = new HttpServer()
    this.logger = new Logger()
    this.server = new Server(this.httpServer, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be a runner instance', () => {
    assert.ok(this.server instanceof RunnerInterface)
  })

  it('.run() should run server successfully', () => {
    const httpServerRunStub = this.sandbox.stub(this.httpServer, 'run').returns(Promise.resolve())
    this.logger.info = this.sandbox.spy()

    return this.server.run()
      .then(() => {
        assert.ok(httpServerRunStub.calledOnce)
        assert.ok(this.logger.info.calledOnce)
      })
  })

  it('.run() should exit with error when server fails on running', () => {
    var serverExitStub = this.sandbox.stub(this.server, 'exit')
    var httpServerRunStub = this.sandbox.stub(this.httpServer, 'run').returns(Promise.reject(new Error('irrelevant')))
    this.logger.error = this.sandbox.spy()

    return this.server.run()
      .then(() => {
        assert.ok(httpServerRunStub.calledOnce)
        assert.ok(this.logger.error.calledOnce)
        assert.ok(serverExitStub.calledWithExactly(1))
      })
  })

  it('.exit() should stop server and exit successfully', () => {
    var httpServerRunStub = this.sandbox.stub(this.httpServer, 'close').returns(Promise.resolve())
    this.logger.warn = this.sandbox.spy()
    var processExitStub = this.sandbox.stub(process, 'exit')

    return this.server.exit()
      .then(() => {
        assert.ok(this.logger.warn.calledOnce)
        assert.ok(processExitStub.calledWithExactly(0))
        assert.ok(httpServerRunStub.calledOnce)
      })
  })

  it('.exit(1) should stop server and exit succesfully with error', () => {
    var httpServerCloseStub = this.sandbox.stub(this.httpServer, 'close').returns(Promise.resolve())
    this.logger.warn = this.sandbox.spy()
    var processExitStub = this.sandbox.stub(process, 'exit')

    return this.server.exit(1)
      .then(() => {
        assert.ok(this.logger.warn.calledOnce)
        assert.ok(processExitStub.calledWithExactly(1))
        assert.ok(httpServerCloseStub.calledOnce)
      })
  })

  it('.exit() should stop server and exit with error when server fails in stop', () => {
    var httpServerCloseStub = this.sandbox.stub(this.httpServer, 'close').returns(Promise.reject(new Error('irrelevant')))
    this.logger.error = this.sandbox.spy()
    var processExitStub = this.sandbox.stub(process, 'exit')

    return this.server.exit()
      .then(() => {
        assert.ok(this.logger.error.calledOnce)
        assert.ok(processExitStub.calledWithExactly(1))
        assert.ok(httpServerCloseStub.calledOnce)
      })
  })
})
