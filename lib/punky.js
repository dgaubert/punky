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

  get app () {
    return this._launcher.app.provider
  }

  get logger () {
    return this._logger.provider
  }

  get metrics () {
    return this._metrics.provider
  }

  run () {
    this._metrics.init()

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
