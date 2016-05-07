'use strict'

const RunnerInterface = require('../../runner-interface')

class Worker extends RunnerInterface {
  constructor (server, logger) {
    super()
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

  close () {
    return this.server.close()
  }

  exit (failure) {
    return this.server.close()
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
