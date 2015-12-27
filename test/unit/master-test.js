'use strict'

const sinon = require('sinon')
const os = require('os')
const Listener = require(__source + 'listeners/listener')
const WorkerManager = require(__source + 'listeners/listener')
const Logger = require(__source + 'logging/logger')
const Master = require(__source + 'master')

describe('Master', () => {

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.sigusr2Listener = new Listener()
    this.existListener = new Listener()
    this.logger = new Logger()

    this.master = new Master(this.sigusr2Listener, this.existListener, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.run() should create as many workers as CPUs there are in the machine', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var masterForkWorkerStub = this.sandbox.stub(this.master, '_forkWorker')
    var sigusr2ListenerListenStub = this.sandbox.stub(this.sigusr2Listener, 'listen')
    var exitListenerListenStub = this.sandbox.stub(this.existListener, 'listen')

    this.master.run()

    loggerInfoStub.calledOnce.should.be.equal(true)
    masterForkWorkerStub.callCount.should.be.equal(os.cpus().length)
    sigusr2ListenerListenStub.calledOnce.should.be.equal(true)
    exitListenerListenStub.calledOnce.should.be.equal(true)
  })

  it('.exit() should exit successfully', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    this.master.exit()

    processExitStub.calledWithExactly(0).should.equal(true)
  })

  it('.exit(1) should stop server and exit succesfully with error', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    this.master.exit(1)

    processExitStub.calledWithExactly(1).should.equal(true)
  })
})
