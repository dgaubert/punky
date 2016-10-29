'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__source + 'logger/logger-interface')
const WorkerManager = require(__source + 'cluster/master/worker-manager')

class Logger extends LoggerInterface {}

describe('worker-manager', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.cluster = {}
    this.logger = new Logger()
    this.workerManager = new WorkerManager(this.cluster, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.fork() should create a new worker', () => {
    var forkStub = this.sandbox.stub()
    this.cluster.fork = forkStub

    this.workerManager.fork()

    assert.ok(forkStub.calledOnce)
  })

  it('.refork() should create a new worker if the previous one crashed', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var workerManagerForkStub = this.sandbox.stub(this.workerManager, 'fork')
    var workerStub = {
      exitedAfterDisconnect: false,
      process: {
        pid: 1
      }
    }

    this.workerManager.refork(workerStub, 1)

    assert.ok(loggerInfoStub.calledOnce)
    assert.ok(workerManagerForkStub.calledOnce)
  })

  it('.refork() should not create a new worker if the previous one made away with itself', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var workerManagerForkStub = this.sandbox.stub(this.workerManager, 'fork')
    var workerStub = {
      exitedAfterDisconnect: true,
      process: {
        pid: 1
      }
    }

    this.workerManager.refork(workerStub, 1)

    assert.ok(!loggerInfoStub.calledOnce)
    assert.ok(!workerManagerForkStub.calledOnce)
  })

  it('.refork() should not create a new worker if the previous one exited', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var workerManagerForkStub = this.sandbox.stub(this.workerManager, 'fork')
    var workerStub = {
      exitedAfterDisconnect: true,
      process: {
        pid: 1
      }
    }

    this.workerManager.refork(workerStub, 0)

    assert.ok(!loggerInfoStub.calledOnce)
    assert.ok(!workerManagerForkStub.calledOnce)
  })

  it('.reloadAll() should restart all workers', () => {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    this.cluster.workers = {
      '1': {},
      '2': {}
    }

    var workerManagerReloadStub = this.sandbox.stub(this.workerManager, 'reload')
    workerManagerReloadStub.returns(Promise.resolve())

    return this.workerManager.reloadAll()
      .then(() => {
        assert.ok(loggerInfoStub.calledOnce)
        assert.ok(!workerManagerReloadStub.calledOnce)
      })
  })

  it('.reload() should restart one worker', () => {
    var newWorkerFake = new EventEmitter()
    this.workerManager.fork = function () {
      return newWorkerFake
    }

    var workerFake = new EventEmitter()
    workerFake.exitedAfterDisconnect = true
    workerFake.disconnect = function () {
      process.nextTick(() => {
        workerFake.emit('exit')
        newWorkerFake.emit('listening')
      })
    }
    this.cluster.workers = {
      '1': workerFake
    }

    return this.workerManager.reload('1')
  })

  it('.reload() should fail due to worker did not fork successfully', () => {
    var newWorkerFake = new EventEmitter()
    this.workerManager.fork = function () {
      return newWorkerFake
    }

    var workerFake = new EventEmitter()
    workerFake.exitedAfterDisconnect = true
    workerFake.disconnect = function () {
      process.nextTick(() => {
        workerFake.emit('exit')
        newWorkerFake.emit('error', new Error('Irrelevant error'))
      })
    }
    this.cluster.workers = {
      '1': workerFake
    }

    return this.workerManager.reload('1')
      .catch((err) => {
        assert.equal(err.message, 'Irrelevant error')
      })
  })

  it('.reload() should fail due to worker did not make away with itself', () => {
    var workerFake = new EventEmitter()
    workerFake.exitedAfterDisconnect = false
    workerFake.disconnect = function () {
      process.nextTick(() => {
        workerFake.emit('exit')
      })
    }
    this.cluster.workers = {
      '1': workerFake
    }

    return this.workerManager.reload('1')
      .catch((err) => {
        assert.equal(err.message, 'Worker exited accidentaly')
      })
  })
})
