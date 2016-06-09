'use strict'

// avoid warnings if punky's user is not using node-config
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'

const config = require('config')
const defaults = require('../config/default')
const ServiceFactory = require('./service-factory')
const LoggerFactory = require('./logger/logger-factory')

class Punky {
  constructor (options = {}) {
    config.util.extendDeep(defaults, options)
    config.util.setModuleDefaults('punky', defaults)

    this.logger = LoggerFactory.create()
  }

  use (router) {
    return ServiceFactory.create(router, this.logger)
  }
}

module.exports = Punky
