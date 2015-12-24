'use strict';

const cluster = require('cluster');
const Listener = require('./listener');

class WorkerExitListener extends Listener {
  constructor(logger) {
    super();
    this.logger = logger;
  }

  listen(run) {
    cluster.on('exit', (worker, code) => {
      this.logger.warn('EXIT received');
      run(worker, code);
    });
  }
}

module.exports = WorkerExitListener;
