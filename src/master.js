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
  }
}

module.exports = Master;
