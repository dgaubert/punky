'use strict'

const sinon = require('sinon')
const Logger = require(__source + 'logger')
const SigintListener = require(__source + 'launcher/sigint-listener')

describe('sigint-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.logger = new Logger()
    this.sigintListener = new SigintListener(this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('listen() should attach listener to SIGINT process event', () => {
    var loggerWarnStub = this.sandbox.stub(this.logger, 'warn')
    var listenerStub = this.sandbox.stub()
    process.removeAllListeners('SIGINT')

    this.sigintListener.listen(listenerStub)
    process.emit('SIGINT')

    loggerWarnStub.calledOnce.should.be.equal(true)
    listenerStub.calledOnce.should.be.equal(true)
    process.removeAllListeners('SIGINT')
  })
})
