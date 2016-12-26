'use strict'

const assert = require('assert')
const options = require(__lib + 'config/defaults')
const RunnerInterface = require(__lib + 'runner-interface')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const LeaderFactory = require(__lib + 'cluster/leader/leader-factory')

describe('leader-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)

    const leader = LeaderFactory.create(metrics, logger)

    assert.ok(leader instanceof RunnerInterface)
  })
})
