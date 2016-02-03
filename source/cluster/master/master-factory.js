'use strict'

const Factory = require('../../factory')
const WorkerManager = require('./worker-manager')
const Sigusr2Listener = require('./sigusr2-listener')
const WorkerExitListener = require('./worker-exit-listener')
const Master = require('./master')

class MasterFactory extends Factory {
  constructor () {
    super()
  }

  create (logger) {
    const workerManager = new WorkerManager(logger)

    const sigusr2Listener = new Sigusr2Listener(logger)
    sigusr2Listener.listen(() => workerManager.reloadAll())

    const workerExitListener = new WorkerExitListener(logger)
    workerExitListener.listen((worker, code) => workerManager.refork(worker, code))

    return new Master(workerManager, logger)
  }
}

module.exports = MasterFactory
