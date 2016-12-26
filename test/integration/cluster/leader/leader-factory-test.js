'use strict'

const assert = require('assert')
const defaultOptions = require(__lib + 'config/default')
const RunnerInterface = require(__lib + 'runner-interface')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const LeaderFactory = require(__lib + 'cluster/leader/leader-factory')

describe('leader-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)

    const leader = LeaderFactory.create(metrics, logger)

    assert.ok(leader instanceof RunnerInterface)
  })
})
