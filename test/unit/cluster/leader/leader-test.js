'use strict'

const assert = require('assert')
const sinon = require('sinon')
const os = require('os')
const EventEmitter = require('events')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const ListenerInterface = require(__lib + 'listener-interface')
const ServerManager = require(__lib + 'cluster/leader/server-manager')
const Leader = require(__lib + 'cluster/leader/leader')

class Logger extends LoggerInterface {}
class Sigusr2Listener extends ListenerInterface {}
class ServerExitListener extends ListenerInterface {}
class SighupListener extends ListenerInterface {}

class Cluster extends EventEmitter {
  fork () {}
}

describe('leader', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.logger = new Logger()

    this.cluster = new Cluster()

    this.sigusr2Listener = new Sigusr2Listener()
    this.sigusr2ListenerListenInfoStub = this.sandbox.stub(this.sigusr2Listener, 'listen')

    this.serverExitListener = new ServerExitListener()
    this.serverExitListenerListenInfoStub = this.sandbox.stub(this.serverExitListener, 'listen')

    this.sigusr2Listener = new Sigusr2Listener()
    this.sigusr2ListenerListenInfoStub = this.sandbox.stub(this.sigusr2Listener, 'listen')

    this.sighupListener = new SighupListener()
    this.sighupListenerListenInfoStub = this.sandbox.stub(this.sighupListener, 'listen')

    this.serverManager = new ServerManager(this.cluster, this.sigusr2Listener, this.serverExitListener, this.sighupListener, this.logger)

    this.leader = new Leader(this.serverManager, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.run() should create as many workers as CPUs there are in the machine', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var serverManagerForkStub = this.sandbox.stub(this.serverManager, 'fork')

    this.leader.run()

    assert.ok(loggerInfoStub.calledOnce)
    assert.equal(serverManagerForkStub.callCount, os.cpus().length)
  })

  it('.exit() should exit successfully', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    this.leader.exit(0)

    assert.ok(loggerInfoStub.calledOnce)
    assert.ok(processExitStub.calledWithExactly(0))
  })

  it('.exit(1) should stop server and exit succesfully with error', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'warn')
    var processExitStub = this.sandbox.stub(process, 'exit')

    this.leader.exit(1)

    assert.ok(loggerInfoStub.calledOnce)
    assert.ok(processExitStub.calledWithExactly(1))
  })
})
