'use strict';

const Listener = require('./listener');

class UncaughtExceptionListener extends Listener {
  constructor(logger) {
    super();
    this.logger = logger || console;
  }

  listen(exit) {
    this._listener = (err) => {
      this.logger.error('Uncaught Exception on %s', process.pid, err);
      process.removeListener('uncaughtException', this._listener);
      exit(1);
    };

    process.on('uncaughtException', this._listener);
  }

}

module.exports = UncaughtExceptionListener;
