'use strict'

const assert = require('assert')
const sinon = require('sinon')
const RunnerInterface = require(__source + 'runner-interface')
const LoggerInterface = require(__source + 'logger/logger-interface')
const Worker = require(__source + 'cluster/worker/worker')

class Runner extends RunnerInterface {}
class Logger extends LoggerInterface {}

describe('worker', function () {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.server = new Runner()
    this.logger = new Logger()
    this.worker = new Worker(this.server, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be a runner instance', () => {
    assert.ok(this.worker instanceof RunnerInterface)
  })

  it('.run() should run server successfully', () => {
    var serverRunStub = this.sandbox.stub(this.server, 'run').returns(Promise.resolve())
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    return this.worker.run()
      .then(() => {
        assert.ok(serverRunStub.calledOnce)
        assert.ok(loggerInfoStub.calledOnce)
      })
  })

  it('.run() should exit with error when server fails on running', () => {
    var workerExitStub = this.sandbox.stub(this.worker, 'exit')
    var serverRunStub = this.sandbox.stub(this.server, 'run').returns(Promise.reject(new Error('irrelevant')))
    var loggerErrorStub = this.sandbox.stub(this.logger, 'error')

    return this.worker.run()
      .then(() => {
        assert.ok(serverRunStub.calledOnce)
        assert.ok(loggerErrorStub.calledOnce)
        assert.ok(workerExitStub.calledWithExactly(1))
      })
  })

  it('.exit() should stop server and exit successfully', () => {
    var serverRunStub = this.sandbox.stub(this.server, 'close').returns(Promise.resolve())
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    return this.worker.exit()
      .then(() => {
        assert.ok(loggerWarnStub.calledOnce)
        assert.ok(processExitStub.calledWithExactly(0))
        assert.ok(serverRunStub.calledOnce)
      })
  })

  it('.exit(1) should stop server and exit succesfully with error', () => {
    var serverRunStub = this.sandbox.stub(this.server, 'close').returns(Promise.resolve())
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    return this.worker.exit(1)
      .then(() => {
        assert.ok(loggerWarnStub.calledOnce)
        assert.ok(processExitStub.calledWithExactly(1))
        assert.ok(serverRunStub.calledOnce)
      })
  })

  it('.exit() should stop server and exit with error when server fails in stop', () => {
    var serverRunStub = this.sandbox.stub(this.server, 'close').returns(Promise.reject(new Error('irrelevant')))
    var loggerErrorStub = this.sandbox.stub(this.logger, 'error')
    var processExitStub = this.sandbox.stub(process, 'exit')

    return this.worker.exit()
      .then(() => {
        assert.ok(loggerErrorStub.calledOnce)
        assert.ok(processExitStub.calledWithExactly(1))
        assert.ok(serverRunStub.calledOnce)
      })
  })
})
