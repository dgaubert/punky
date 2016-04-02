'use strict'

const sinon = require('sinon')
const ListenerInterface = require(__source + 'listener-interface')
const RunnerInterface = require(__source + 'runner-interface')
const LoggerInterface = require(__source + 'logger-interface')
const Server = require(__source + 'cluster/worker/server')
const EventEmitter = require('events')

describe('server', function () {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.app = new ListenerInterface()
    this.logger = new LoggerInterface()
    this.server = new Server(this.app, 3000, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be a runner instance', () => {
    this.server.should.instanceof(RunnerInterface)
  })

  it('.run() should listen on specific port successfully', () => {
    var httpServerStub = new EventEmitter()
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServerStub)
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    setTimeout(() => {
      httpServerStub.emit('listening')
    }, 10)
    return this.server.run()
      .then(() => {
        appRunStub.calledOnce.should.be.equal(true)
        loggerInfoStub.calledOnce.should.be.equal(true)
      })
  })

  it('.run() should fail when app listening fails', () => {
    var httpServerStub = new EventEmitter()
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServerStub)

    setTimeout(() => {
      httpServerStub.emit('error')
    }, 10)
    return this.server.run()
      .catch(() => {
        appRunStub.calledOnce.should.be.equal(true)
      })
  })

  it('.run() should fail when app is not redy', () => {
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(null)

    return this.server.run()
      .catch(() => {
        appRunStub.calledOnce.should.be.equal(true)
      })
  })
})
