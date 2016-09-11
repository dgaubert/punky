'use strict'

const assert = require('assert')
const defaultOptions = require(__source + 'config/default')
const LoggerFactory = require(__source + 'logger/logger-factory')
const MetricsFactory = require(__source + 'metrics/metrics-factory')
const RunnerInterface = require(__source + 'runner-interface')
const ClusterFactory = require(__source + 'cluster/cluster-factory')

describe('cluster-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)
    const cluster = ClusterFactory.create(metrics, logger, defaultOptions)

    assert.ok(cluster instanceof RunnerInterface)
  })
})
