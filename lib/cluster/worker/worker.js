'use strict'

const RunnerInterface = require('../../runner-interface')

class Worker extends RunnerInterface {
  constructor (server, logger) {
    super()
    process.title = 'Worker'
    this.server = server
    this.logger = logger
  }

  run () {
    return this.server.run()
      .then(() => {
        this.logger.info('Ready')
      })
      .catch((err) => {
        this.logger.error('Failed on initializing', err.stack)
        this.exit(1)
      })
  }

  exit (failure) {
    return this.server.exit()
      .then(() => {
        this.logger.warn('Exit')
        process.exit(failure || 0)
      })
      .catch((err) => {
        this.logger.error('Failed on exit', err.stack)
        process.exit(1)
      })
  }
}

module.exports = Worker
