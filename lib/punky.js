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
    this._launcher = LauncherFactory.create(this._metrics, this._logger, options)
  }

  isMaster () {
    return this._launcher.target.role.isMaster()
  }

  get app () {
    if (this._launcher.target.role.isMaster()) {
      throw new Error('app is not available for master role')
    }

    return this._launcher.target.server.app.provider
  }

  get logger () {
    return this._logger.provider
  }

  get metrics () {
    return this._metrics.provider
  }

  run () {
    return this._launcher.run()
  }

  close () {
    return this._launcher.close()
  }

  exit () {
    return this._launcher.exit()
  }
}

module.exports = Punky
