'use strict';

const Runnable = require('./runnable');

class Launcher extends Runnable {
  constructor(target, logger) {
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
    process.removeAllListeners('SIGINT');
    process.on('SIGINT', () => {
      this.logger.warn('SIGINT received on %s', process.pid);
      this.exit();
    });
  }

  _addSigtermListener() {
    process.removeAllListeners('SIGTERM');
    process.on('SIGTERM', () => {
       this.logger.warn('SIGTERM received on %s', process.pid);
       this.exit();
    });
  }

  _addUncaughtExceptionListener() {
    process.removeAllListeners('uncaughtException');
    process.on('uncaughtException', (err) => {
      this.logger.error('Uncaught Exception on %s', process.pid, err);
      this.exit(1);
    });
  }

  run() {
    return this.target.run();
  }

  exit(failure) {
    return this.target.exit(failure);
  }

}

module.exports = Launcher;
