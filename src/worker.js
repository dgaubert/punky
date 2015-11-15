const Runnable = require('./runnable');

class Worker extends Runnable {
  constructor(app, logger) {
    super();
    this.app = app;
    this.logger = logger || console;
    
    process.on('SIGINT', () => {
      this.logger.warn('SIGINT received, stopping...');
      this.exit();
    });

    process.on('SIGTERM', () => {
      this.logger.warn('SIGTERM received, stopping...');
      this.exit();
    });

    process.on('uncaughtException', (err) => {
      this.logger.error('Uncaught Exception', err);
      this.exit(1);
    });
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
