'use strict'

const MetricsFactory = require('./metrics/metrics-factory')
const LoggerFactory = require('./logger/logger-factory')
const LauncherFactory = require('./launcher/launcher-factory')
const defaultOptions = require('./config/default')

class Punky {
  constructor (clientOptions = {}) {
    const options = Object.assign({}, defaultOptions, clientOptions)

    this._logger = LoggerFactory.create(options)
    this._metrics = MetricsFactory.create(this._logger, options)
    this.launcher = LauncherFactory.create(this._metrics, this._logger, options)
  }

  isMaster () {
    return this.launcher.target.role.isMaster()
  }

  get app () {
    if (this.launcher.target.role.isMaster()) {
      throw new Error('app is not available for master role')
    }

    return this.launcher.target.server.app.provider
  }

  get logger () {
    return this._logger.provider
  }

  get metrics () {
    return this.metrics.provider
  }

  run () {
    return this.launcher.run()
  }

  close () {
    return this.launcher.close()
  }

  exit () {
    return this.launcher.exit()
  }
}

module.exports = Punky
