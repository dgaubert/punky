'use strict';

const cluster = require('cluster');
const os = require('os');
const Runnable = require('./runnable');

class Master extends Runnable {
  constructor(numberOfWorkers, reloader, logger) {
    super();
    this.numberOfWorkers = numberOfWorkers || process.env.WORKERS || os.cpus().length;
    this.reloader = reloader;
    this.logger = logger || console;
  }

  run() {
    for (var i = 0; i < this.numberOfWorkers; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code) => {
      this.forkWorker(worker, code);
    });

    process.on('SIGUSR2', () => {
      this.reloadAllWorkers();
    });

    this.logger.info('Master %s ready', process.pid);
  }

  exit(failure) {
    this.logger.warn('Master %s out!', process.pid);
    process.exit(failure || 0);
  }

  reloadAllWorkers() {
    this.logger.info('Reloading workers');

    var workers = Object.keys(cluster.workers);

    return this.workerIterator(workers, 0)
      .then(() => {
        this.logger.info('Workers reloaded');
      });
  }

  workerIterator(workers, index) {
    return this.restartWorker(workers[index])
      .then(() => {
        index += 1;
        if(index < workers.length) {
          return this.workerIterator(workers, index);
        }
      });
  }

  restartWorker(workerId) {
    return new Promise((resolve, reject) => {
      var worker = cluster.workers[workerId];

      worker.disconnect();

      worker.once('exit', () => {
        if(!worker.suicide) {
          return reject(new Error('Worker exited accidentaly'));
        }

        var newWorker = cluster.fork();

        newWorker.once('listening', () => {
          resolve();
        });

        newWorker.once('error', (err) => {
          reject(err);
        });
      });
    });
  }

  forkWorker(worker, code) {
    if (code !== 0 && !worker.suicide) {
      this.logger.info('Worker %s crashed. Starting a new worker', worker.process.pid);
      cluster.fork();
    }
  }
}

module.exports = Master;
