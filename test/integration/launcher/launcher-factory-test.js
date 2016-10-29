'use strict'

const assert = require('assert')
const defaultOptions = require(__source + 'config/default')
const RunnerInterface = require(__source + 'runner-interface')
const LoggerFactory = require(__source + 'logger/logger-factory')
const MetricsFactory = require(__source + 'metrics/metrics-factory')
const LauncherFactory = require(__source + 'launcher/launcher-factory')

describe('launcher-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)
    const launcher = LauncherFactory.create(metrics, logger, defaultOptions)

    assert.ok(launcher instanceof RunnerInterface)
  })
})
