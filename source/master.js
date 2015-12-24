'use strict';

const os = require('os');
const cluster = require('cluster');
const Runner = require('./runner');

class Master extends Runner {
  constructor(sigusr2Listener, exitListener, logger) {
    super();
    process.title = 'Master';
    this.sigusr2Listener = sigusr2Listener;
    this.exitListener = exitListener;
    this.logger = logger;
    this.numberOfWorkers = process.env.WORKERS || os.cpus().length;
  }

  run() {
    for (var i = 0; i < this.numberOfWorkers; i++) {
      this._forkWorker();
    }

    this.sigusr2Listener.listen(() => this._reloadAllWorkers());
    this.exitListener.listen((worker, code) => this._reforkWorker());

    this.logger.info('Ready');
  }

  exit(failure) {
    this.logger.warn('Exit');
    process.exit(failure || 0);
  }

  _reloadAllWorkers() {
    this.logger.info('Reloading workers');

    var workers = Object.keys(cluster.workers);

    return this._workerIterator(workers, 0)
      .then(() => {
        this.logger.info('Workers reloaded');
      });
  }


  _reforkWorker(worker, code) {
    if (code !== 0 && !worker.suicide) {
      this.logger.info('Crashed. Reforking a new one');
      this._forkWorker();
    }
  }

  _forkWorker() {
    cluster.fork();
  }

  _workerIterator(workers, index) {
    return this._restartWorker(workers[index])
      .then(() => {
        index += 1;
        if(index < workers.length) {
          return this._workerIterator(workers, index);
        }
      });
  }

  _restartWorker(workerId) {
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

}

module.exports = Master;
