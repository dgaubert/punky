'use strict';

const Runnable = require('./runnable');

class Launcher extends Runnable {
  constructor(target, logger) {
    if (!target || !(target instanceof Runnable)) {
      throw new Error('Target is not a Runnable');
    }

    super();
    this.target = target;
    this.logger = logger || console;

    this._addListeners();
  }

  _addListeners() {
    this._addSigintListener();
    this._addSigtermListener();
    this._addUncaughtExceptionListener();
  }

  _addSigintListener() {
    var sigintListener = () => {
      this.logger.warn('SIGINT received on %s', process.pid);
      this.exit();
    };
    process.removeListener('SIGINT', sigintListener);
    process.on('SIGINT', sigintListener);
  }

  _addSigtermListener() {
    var sigtermListener = () => {
       this.logger.warn('SIGTERM received on %s', process.pid);
       this.exit();
    };
    process.removeListener('SIGTERM', sigtermListener);
    process.on('SIGTERM', sigtermListener);
  }

  _addUncaughtExceptionListener() {
    var uncaughtExceptionListener =  (err) => {
      this.logger.error('Uncaught Exception on %s', process.pid, err);
      this.exit(1);
    };
    process.removeListener('uncaughtException', uncaughtExceptionListener);
    process.on('uncaughtException', uncaughtExceptionListener);
  }

  run() {
    return this.target.run();
  }

  exit(failure) {
    return this.target.exit(failure);
  }

}

module.exports = Launcher;
