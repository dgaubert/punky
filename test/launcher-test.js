'use strict';

const sinon = require('sinon');
const Runnable = require(__source + 'runnable');
const Launcher = require(__source + 'launcher');
const Master = require(__source + 'master');

describe('launcher module', function() {
  it('should be a runnable command', function() {
    const master = new Master();

    const launcher = new Launcher(master);

    launcher.should.instanceof(Runnable);
  });

  it('should throw an exception when target is not injected', function() {
    Launcher.should.throw();
  });

  it('.run() should call target\'s run method', function() {
    const master = new Master();
    const runStub = sinon.stub(master, 'run');
    const launcher = new Launcher(master);

    launcher.run();

    runStub.calledOnce.should.be.equal(true);
  });

  it('.exit() should call target\'s run method', function() {
    const master = new Master();
    const exitStub = sinon.stub(master, 'exit');
    const launcher = new Launcher(master);

    launcher.exit();

    exitStub.calledOnce.should.be.equal(true);
  });

  it('.exit(1) should call target\'s run method', function() {
    const master = new Master();
    const exitStub = sinon.stub(master, 'exit');
    const launcher = new Launcher(master);

    launcher.exit(1);

    exitStub.calledWithExactly(1).should.be.equal(true);
  });

});
