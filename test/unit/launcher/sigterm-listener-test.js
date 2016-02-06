'use strict'

const sinon = require('sinon')
const Logger = require(__source + 'logger')
const SigtermListener = require(__source + 'launcher/sigterm-listener')

describe('sigterm-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.logger = new Logger()
    this.sigtermListener = new SigtermListener(this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('listen() should attach listener to SIGTERM process event', () => {
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var listenerStub = this.sandbox.stub()
    process.removeAllListeners('SIGTERM')

    this.sigtermListener.listen(listenerStub)
    process.emit('SIGTERM')

    loggerWarnStub.calledOnce.should.be.equal(true)
    listenerStub.calledOnce.should.be.equal(true)
    process.removeAllListeners('SIGTERM')
  })
})
