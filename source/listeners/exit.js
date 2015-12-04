'use strict';

const Listener = require('./listener');

class ExitListener extends Listener {
  constructor(logger) {
    super();
    this.logger = logger || console;
  }

  listen(run) {
    process.on('exit', (worker, code) => {
      this.logger.warn('EXIT received on %s', process.pid);
      run(worker, code);
    });
  }
}

module.exports = ExitListener;
