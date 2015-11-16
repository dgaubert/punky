const Runnable = require('./runnable');

class Worker extends Runnable {
  constructor(app, logger) {
    super();
    this.app = app;
    this.logger = logger || console;
  }
  
  run() {
    return this.app.start()
      .then(() => {
        this.logger.info('Worker %s ready!', process.pid);
      })
      .catch((err) => {
        this.logger.error('Worker %s failed on initializing', process.pid, err);
        this.exit(1);
      });
  }
  
  exit(failure) {
    return this.app.stop()
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
