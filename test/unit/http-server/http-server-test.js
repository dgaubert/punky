'use strict'

const assert = require('assert')
const sinon = require('sinon')
const ListenerInterface = require(__lib + 'listener-interface')
const RunnerInterface = require(__lib + 'runner-interface')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const HttpServer = require(__lib + 'http-server/http-server')
const EventEmitter = require('events')

class Listener extends ListenerInterface {}
class Logger extends LoggerInterface {}

describe('server', function () {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this.port = 9876
    this.app = new Listener()
    this.logger = new Logger()
    this.httpServer = new HttpServer(this.app, this.port, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be a runner instance', () => {
    assert.ok(this.httpServer instanceof RunnerInterface)
  })

  it('.run() should listen on specific port successfully', () => {
    var httpServerStub = new EventEmitter()
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServerStub)
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    setTimeout(() => {
      httpServerStub.emit('listening')
    }, 10)
    return this.httpServer.run()
      .then(() => {
        assert.ok(appRunStub.calledOnce)
        assert.ok(loggerInfoStub.calledOnce)
      })
  })

  it('.run() should fail when app listening fails', () => {
    var httpServerStub = new EventEmitter()
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServerStub)

    setTimeout(() => {
      httpServerStub.emit('error')
    }, 10)

    return this.httpServer.run()
      .catch(() => {
        assert.ok(appRunStub.calledOnce)
      })
  })

  it('.run() should fail when app is not redy', () => {
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(null)

    return this.httpServer.run()
      .catch(() => {
        assert.ok(appRunStub.calledOnce)
      })
  })

  it('.close() should stop even though http-server is not listening', () => {
    return this.httpServer.close()
  })

  it('.close() should stop successfully when http-server is listening', () => {
    var httpServer = new EventEmitter()
    httpServer.close = () => {}
    var httpServerStub = this.sandbox.stub(httpServer, 'close').returns(httpServer)
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServer)
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    setTimeout(() => httpServer.emit('listening'), 2)

    return this.httpServer.run()
      .then(() => {
        assert.ok(appRunStub.calledOnce)
        setTimeout(() => httpServer.emit('close'), 2)
        return this.httpServer.close()
      })
      .then(() => {
        assert.ok(httpServerStub.calledOnce)
        assert.ok(loggerInfoStub.calledTwice)
      })
  })

  it('.close() should fail when http-server also fails', () => {
    var httpServer = new EventEmitter()
    httpServer.close = () => {}
    var httpServerStub = this.sandbox.stub(httpServer, 'close').returns(httpServer)
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServer)
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    setTimeout(() => httpServer.emit('listening'), 2)
    return this.httpServer.run()
      .then(() => {
        assert.ok(appRunStub.calledOnce)
        setTimeout(() => httpServer.emit('error', new Error('irrelevant')), 2)
        return this.httpServer.close()
      })
      .catch(err => {
        assert.equal(err.message, 'irrelevant')
        assert.ok(httpServerStub.calledOnce)
        assert.ok(loggerInfoStub.calledOnce)
      })
  })
})
