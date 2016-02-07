'use strict'

const sinon = require('sinon')
const Logger = require(__source + 'logger')
const cluster = require('cluster')
const WorkerExitListener = require(__source + 'cluster/master/worker-exit-listener')

describe('worker-exit-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.logger = new Logger()
    this.workerExitListener = new WorkerExitListener(this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('listen() should attach listener to cluster event', () => {
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var listenerStub = this.sandbox.stub()

    this.workerExitListener.listen(listenerStub)
    cluster.emit('exit', 1, 1)

    loggerWarnStub.calledOnce.should.be.equal(true)
    listenerStub.calledOnce.should.be.equal(true)
    listenerStub.calledWithExactly(1, 1).should.be.equal(true)
    cluster.removeAllListeners('exit')
  })
})