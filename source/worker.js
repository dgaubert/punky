'use strict';

const Runner = require('./runner');

class Worker extends Runner {
  constructor(server, logger) {
    super();
    this.server = server;
    this.logger = logger || console;
  }

  run() {
    return this.server.run()
      .then(() => {
        this.logger.info('Worker %s ready', process.pid);
      })
      .catch((err) => {
        this.logger.error('Worker %s failed on initializing', process.pid, err.stack);
        this.exit(1);
      });
  }

  exit(failure) {
    return this.server.exit()
      .then(() => {
        this.logger.warn('Worker %s out!', process.pid);
        process.exit(failure || 0);
      })
      .catch((err) => {
        this.logger.error('Worker %s failed on exit', process.pid, err);
        process.exit(1);
      });
  }
}

module.exports = Worker;
