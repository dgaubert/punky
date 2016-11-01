'use strict'

const assert = require('assert')
const defaultOptions = require(__source + 'config/default')
const RunnerInterface = require(__source + 'runner-interface')
const MetricsFactory = require(__source + 'metrics/metrics-factory')
const LoggerFactory = require(__source + 'logger/logger-factory')
const MasterFactory = require(__source + 'cluster/master/master-factory')

describe('master-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)

    const master = MasterFactory.create(metrics, logger)

    assert.ok(master instanceof RunnerInterface)
  })
})
