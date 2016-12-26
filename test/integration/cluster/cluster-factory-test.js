'use strict'

const assert = require('assert')
const defaultOptions = require(__lib + 'config/default')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')
const RunnerInterface = require(__lib + 'runner-interface')
const ClusterFactory = require(__lib + 'cluster/cluster-factory')

describe('cluster-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)
    const cluster = ClusterFactory.create(metrics, logger, defaultOptions)

    assert.ok(cluster instanceof RunnerInterface)
  })
})
