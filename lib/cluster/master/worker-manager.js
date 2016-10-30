'use strict'

class WorkerManager {
  constructor (cluster, sigusr2Listener, workerExitListener, logger) {
    this.cluster = cluster
    this.logger = logger
    sigusr2Listener.listen(() => this.reloadAll())
    workerExitListener.listen((worker, code) => this.refork(worker, code))
  }

  reloadAll () {
    this.logger.info('Reload all workers')

    const workerKeys = Object.keys(this.cluster.workers)
    const reloads = workerKeys.map((workerKey) => this.reload(workerKey))

    return Promise.all(reloads)
  }

  refork (worker, code) {
    if (code > 0 && !worker.exitedAfterDisconnect) {
      this.fork()
    }
  }

  fork () {
    this.logger.info('Fork worker')
    this.cluster.fork()
  }

  reload (workerId) {
    return new Promise((resolve, reject) => {
      const worker = this.cluster.workers[workerId]

      worker.disconnect()

      worker.once('exit', () => {
        if (!worker.exitedAfterDisconnect) {
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
