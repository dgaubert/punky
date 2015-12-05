'use strict';

const sinon = require('sinon');
const Runnable = require(__source + 'runnable');
const Server = require(__source + 'server');
const Logger = require(__source + 'logging/logger');
const Worker = require(__source + 'worker');
const Launcher = require(__source + 'launcher');

describe('launcher', () => {

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();

    this.master = new Server();
    this.logger = new Logger();
    this.worker = new Worker(this.server, this.logger);
    this.launcher = new Launcher(this.worker);
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  it('should be a runnable instance', () => {
    this.launcher.should.instanceof(Runnable);
  });

  it('.run() should launch worker successfully', () => {
    var targetRunStub = this.sandbox.stub(this.worker, 'run').returns(Promise.resolve());

    return this.launcher.run()
      .then(() => {
        targetRunStub.calledOnce.should.be.equal(true);
      });
  });

  it('.exit() should exit worker successfully', () => {
    var targetExitStub = this.sandbox.stub(this.worker, 'exit').returns(Promise.resolve());

    return this.launcher.exit()
      .then(() => {
        targetExitStub.calledWithExactly(undefined).should.be.equal(true);
      });
  });

  it('.exit(1) should exit worker with error', () => {
    var targetExitStub = this.sandbox.stub(this.worker, 'exit').returns(Promise.resolve());

    return this.launcher.exit(1)
      .then(() => {
        targetExitStub.calledWithExactly(1).should.be.equal(true);
      });
  });
});
