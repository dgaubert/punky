'use strict'

const assert = require('assert')
const defaultOptions = require(__source + 'config/default')
const RunnerInterface = require(__source + 'runner-interface')
const MetricsFactory = require(__source + 'metrics/metrics-factory')
const LoggerFactory = require(__source + 'logger/logger-factory')
const LeaderFactory = require(__source + 'cluster/leader/leader-factory')

describe('leader-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)

    const leader = LeaderFactory.create(metrics, logger)

    assert.ok(leader instanceof RunnerInterface)
  })
})
