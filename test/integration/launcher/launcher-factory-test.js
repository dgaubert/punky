'use strict'

const assert = require('assert')
const defaultOptions = require(__lib + 'config/default')
const RunnerInterface = require(__lib + 'runner-interface')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')
const LauncherFactory = require(__lib + 'launcher/launcher-factory')

describe('launcher-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)
    const launcher = LauncherFactory.create(metrics, logger, defaultOptions)

    assert.ok(launcher instanceof RunnerInterface)
  })
})
