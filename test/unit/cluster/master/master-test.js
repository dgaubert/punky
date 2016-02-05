'use strict'

const sinon = require('sinon')
const os = require('os')
const Logger = require(__source + 'logger')
const WorkerManager = require(__source + 'cluster/master/worker-manager')
const Master = require(__source + 'cluster/master/master')

describe('master', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.logger = new Logger()
    this.workerManager = new WorkerManager(this.logger)

    this.master = new Master(this.workerManager, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.run() should create as many workers as CPUs there are in the machine', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var workerManagerForkStub = this.sandbox.stub(this.workerManager, 'fork')

    this.master.run()

    loggerInfoStub.calledOnce.should.be.equal(true)
    workerManagerForkStub.callCount.should.be.equal(os.cpus().length)
  })

  it('.exit() should exit successfully', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    this.master.exit()

    loggerInfoStub.calledOnce.should.be.equal(true)
    processExitStub.calledWithExactly(0).should.equal(true)
  })

  it('.exit(1) should stop server and exit succesfully with error', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    this.master.exit(1)

    loggerInfoStub.calledOnce.should.be.equal(true)
    processExitStub.calledWithExactly(1).should.equal(true)
  })
})
