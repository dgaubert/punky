'use strict'

const assert = require('assert')
const sinon = require('sinon')
const os = require('os')
const cluster = require('cluster')
const LoggerInterface = require(__source + 'logger/logger-interface')
const WorkerManager = require(__source + 'cluster/master/worker-manager')
const Master = require(__source + 'cluster/master/master')

describe('master', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.logger = new LoggerInterface()
    this.workerManager = new WorkerManager(cluster, this.logger)

    this.master = new Master(this.workerManager, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.run() should create as many workers as CPUs there are in the machine', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var workerManagerForkStub = this.sandbox.stub(this.workerManager, 'fork')

    this.master.run()

    assert.ok(loggerInfoStub.calledOnce)
    assert.equal(workerManagerForkStub.callCount, os.cpus().length)
  })

  it('.exit() should exit successfully', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    this.master.exit(0)

    assert.ok(loggerInfoStub.calledOnce)
    assert.ok(processExitStub.calledWithExactly(0))
  })

  it('.exit(1) should stop server and exit succesfully with error', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    this.master.exit(1)

    assert.ok(loggerInfoStub.calledOnce)
    assert.ok(processExitStub.calledWithExactly(1))
  })
})
