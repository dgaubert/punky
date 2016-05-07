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

  it('.close() should stop even though http-server is not listening', () => {
    return this.server.close()
  })

  it('.close() should stop successfully when http-server is listening', () => {
    var httpServer = new EventEmitter()
    httpServer.close = () => {}
    var httpServerStub = this.sandbox.stub(httpServer, 'close').returns(httpServer)
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServer)
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    setTimeout(() => httpServer.emit('listening'), 2)
    return this.server.run()
      .then(() => {
        appRunStub.calledOnce.should.be.equal(true)
        setTimeout(() => httpServer.emit('close'), 2)
        return this.server.close()
      })
      .then(() => {
        httpServerStub.calledOnce.should.be.equal(true)
        loggerInfoStub.calledTwice.should.be.equal(true)
      })
  })

  it('.close() should fail when http-server also fails', () => {
    var httpServer = new EventEmitter()
    httpServer.close = () => {}
    var httpServerStub = this.sandbox.stub(httpServer, 'close').returns(httpServer)
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServer)
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    setTimeout(() => httpServer.emit('listening'), 2)
    return this.server.run()
      .then(() => {
        appRunStub.calledOnce.should.be.equal(true)
        setTimeout(() => httpServer.emit('error', new Error('irrelevant')), 2)
        return this.server.close()
      })
      .catch((err) => {
        err.message.should.be.equal('irrelevant')
        httpServerStub.calledOnce.should.be.equal(true)
        loggerInfoStub.calledOnce.should.be.equal(true)
      })
  })
})
