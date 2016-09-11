'use strict'

const assert = require('assert')
const sinon = require('sinon')
const RunnerInterface = require(__source + 'runner-interface')
const ListenerInterface = require(__source + 'listener-interface')
const Launcher = require(__source + 'launcher/launcher')

describe('launcher', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.runner = new RunnerInterface()
    this.listener = new ListenerInterface()
    this.sandbox.stub(this.listener, 'listen')

    this.launcher = new Launcher(this.runner, this.listener)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be a runner instance', () => {
    assert.ok(this.launcher instanceof RunnerInterface)
  })

  it('.run() should launch worker successfully', () => {
    var targetRunStub = this.sandbox.stub(this.runner, 'run').returns(Promise.resolve())

    return this.launcher.run()
      .then(() => {
        assert.ok(targetRunStub.calledOnce)
      })
  })

  it('.exit() should exit worker successfully', () => {
    var targetExitStub = this.sandbox.stub(this.runner, 'exit').returns(Promise.resolve())

    return this.launcher.exit()
      .then(() => {
        assert.ok(targetExitStub.calledWithExactly)
      })
  })

  it('.exit(1) should exit worker with error', () => {
    var targetExitStub = this.sandbox.stub(this.runner, 'exit').returns(Promise.resolve())

    return this.launcher.exit(1)
      .then(() => {
        assert.ok(targetExitStub.calledWithExactly(1))
      })
  })
})
