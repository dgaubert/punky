'use strict';

const sinon = require('sinon');
const Runnable = require(__source + 'runnable');
const Listener = require(__source + 'listeners/listener');
const Launcher = require(__source + 'launcher');
const Master = require(__source + 'master');

describe('launcher module', () => {
  it('should be a runnable command', () => {
    var master = new Master();
    var listener = new Listener();
    var listenStub = sinon.stub(listener, 'listen');
    var launcher = new Launcher(master, listener);

    launcher.should.instanceof(Runnable);
  });

  it('.run() should call target\'s run method', () => {
    var master = new Master();
    var runStub = sinon.stub(master, 'run');
    var listener = new Listener();
    var listenStub = sinon.stub(listener, 'listen');
    var launcher = new Launcher(master, listener);

    launcher.run();

    runStub.calledOnce.should.be.equal(true);
  });

  it('.exit() should call target\'s exit method', () => {
    var master = new Master();
    var exitStub = sinon.stub(master, 'exit');
    var listener = new Listener();
    var listenStub = sinon.stub(listener, 'listen');
    var launcher = new Launcher(master, listener);

    launcher.exit();

    exitStub.calledOnce.should.be.equal(true);
  });

  it('.exit(1) should call target\'s exit method', () => {
    var master = new Master();
    var exitStub = sinon.stub(master, 'exit');
    var listener = new Listener();
    var listenStub = sinon.stub(listener, 'listen');
    var launcher = new Launcher(master, listener);

    launcher.exit(1);

    exitStub.calledWithExactly(1).should.be.equal(true);
  });
});
