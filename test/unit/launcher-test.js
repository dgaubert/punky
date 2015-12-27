'use strict'

const sinon = require('sinon')
const Runner = require(__source + 'runner')
const Listener = require(__source + 'listeners/listener')
const Launcher = require(__source + 'launcher')

describe('launcher', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.runner = new Runner()
    this.listener = new Listener()
    this.sandbox.stub(this.listener, 'listen')

    this.launcher = new Launcher(this.runner, this.listener)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('should be a runner instance', () => {
    this.launcher.should.instanceof(Runner)
  })

  it('.run() should launch worker successfully', () => {
    var targetRunStub = this.sandbox.stub(this.runner, 'run').returns(Promise.resolve())

    return this.launcher.run()
      .then(() => {
        targetRunStub.calledOnce.should.be.equal(true)
      })
  })

  it('.exit() should exit worker successfully', () => {
    var targetExitStub = this.sandbox.stub(this.runner, 'exit').returns(Promise.resolve())

    return this.launcher.exit()
      .then(() => {
        targetExitStub.calledWithExactly(undefined).should.be.equal(true)
      })
  })

  it('.exit(1) should exit worker with error', () => {
    var targetExitStub = this.sandbox.stub(this.runner, 'exit').returns(Promise.resolve())

    return this.launcher.exit(1)
      .then(() => {
        targetExitStub.calledWithExactly(1).should.be.equal(true)
      })
  })
})
