'use strict'

class WorkerManager {
  constructor (cluster, logger) {
    this.cluster = cluster
    this.logger = logger
  }

  reloadAll () {
    this.logger.info('Reloading workers')

    const workerKeys = Object.keys(this.cluster.workers)
    const reloads = workerKeys.map((workerKey) => this.reload(workerKey))

    return Promise.all(reloads)
  }

  refork (worker, code) {
    if (code > 0 && !worker.suicide) {
      this.logger.info('Worker %s exited. Reforking a new one', worker.process.pid)
      this.fork()
    }
  }

  fork () {
    return this.cluster.fork()
  }

  reload (workerId) {
    return new Promise((resolve, reject) => {
      const worker = this.cluster.workers[workerId]

      worker.disconnect()

      worker.once('exit', () => {
        if (!worker.suicide) {
          return reject(new Error('Worker exited accidentaly'))
        }

        const newWorker = this.fork()

        newWorker.once('listening', () => {
          resolve()
        })

        newWorker.once('error', (err) => {
          reject(err)
        })
      })
    })
  }
}

module.exports = WorkerManager
