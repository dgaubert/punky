'use strict'

const ListenerInterface = require('../../listener-interface')

class WorkerExitListener extends ListenerInterface {
  constructor (emitter, logger) {
    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen (run) {
    this.emitter.on('exit', (worker, code) => {
      this.logger.warn('EXIT received')
      run(worker, code)
    })
  }
}

module.exports = WorkerExitListener
