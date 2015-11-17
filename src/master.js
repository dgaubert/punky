const cluster = require('cluster');
const os = require('os');
const Runnable = require('./runnable');

class Master extends Runnable {
  constructor(workers, logger) {
    super();
    this.workers = workers || process.env.WORKERS || os.cpus().length;
    this.logger = logger || console;
  }

  run() {
    for (var i = 0; i < this.workers; i++) {
      cluster.fork();
    }

    cluster.on('disconnect', (worker) => {
      this.logger.error('Worker %s disconnected', worker.process.pid);
    });

    cluster.on('exit', function(worker, code) {
      if(code !== 0 && !worker.suicide) {
        this.logger.info('Worker %s crashed. Starting a new worker', worker.process.pid);
        cluster.fork();
      }
    });

    process.on('SIGUSR2', function() {
      this.logger.info('Restarting workers');
      var workers = Object.keys(cluster.workers);

      function restartWorker(i) {
        if(i >= workers.length) {
          return;
        }

        var worker = cluster.workers[workers[i]];
        worker.disconnect();

        worker.on('exit', function() {
          if(!worker.suicide) {
            return;
          }

          cluster.fork()
            .on('listening', function() {
              restartWorker(i + 1);
            });
        });
      }

      restartWorker(0);
    });

  }

  exit(failure) {
    this.logger.warn('Master %s out!', process.pid);
    process.exit(failure || 0);
  }
}

module.exports = Master;
