'use strict'

const cluster = require('cluster')
const FactoryInterface = require('../../factory-interface')
const WorkerManager = require('./worker-manager')
const Sigusr2Listener = require('./sigusr2-listener')
const WorkerExitListener = require('./worker-exit-listener')
const Master = require('./master')

class MasterFactory extends FactoryInterface {
  static create (logger) {
    const workerManager = new WorkerManager(cluster, logger)

    const sigusr2Listener = new Sigusr2Listener(process, logger)
    sigusr2Listener.listen(() => workerManager.reloadAll())

    const workerExitListener = new WorkerExitListener(cluster, logger)
    workerExitListener.listen((worker, code) => workerManager.refork(worker, code))

    return new Master(workerManager, logger)
  }
}

module.exports = MasterFactory
