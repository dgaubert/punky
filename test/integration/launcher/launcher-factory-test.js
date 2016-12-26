'use strict'

const assert = require('assert')
const options = require(__lib + 'config/defaults')
const RunnerInterface = require(__lib + 'runner-interface')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')
const LauncherFactory = require(__lib + 'launcher/launcher-factory')

describe('launcher-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)
    const launcher = LauncherFactory.create(metrics, logger, options)

    assert.ok(launcher instanceof RunnerInterface)
  })
})
