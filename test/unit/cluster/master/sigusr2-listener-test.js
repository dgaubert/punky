'use strict'

const sinon = require('sinon')
const Logger = require(__source + 'logger')
const Sigusr2Listener = require(__source + 'cluster/master/sigusr2-listener')

describe('sigusr2-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.logger = new Logger()
    this.sigusr2Listener = new Sigusr2Listener(this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('listen() should attach listener to SIGUSR2 process event', () => {
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var listenerStub = this.sandbox.stub()

    this.sigusr2Listener.listen(listenerStub)
    process.emit('SIGUSR2')

    loggerWarnStub.calledOnce.should.be.equal(true)
    listenerStub.calledOnce.should.be.equal(true)
    process.removeAllListeners('SIGUSR2')
  })
})
