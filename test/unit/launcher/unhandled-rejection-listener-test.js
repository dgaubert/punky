'use strict'

const sinon = require('sinon')
const Logger = require(__source + 'logger')
const UnhandledRejectionListener = require(__source + 'launcher/unhandled-rejection-listener')

describe('unhandled-rejection-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.logger = new Logger()
    this.unhandledRejectionListener = new UnhandledRejectionListener(this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('listen() should attach listener to uncaughtException process event', (done) => {
    var loggerErrorStub = this.sandbox.stub(this.logger, 'error')
    process.removeAllListeners('unhandledRejection')

    this.unhandledRejectionListener.listen()
    process.emit('unhandledRejection', new Error('Irrelevant error'), Promise.reject(new Error('Irrelevant error')))

    process.nextTick(() => {
      loggerErrorStub.calledOnce.should.be.equal(true)
      process.removeAllListeners('unhandledRejection')
      done()
    })
  })
})
