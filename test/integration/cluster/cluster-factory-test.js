'use strict'

const assert = require('assert')
const options = require(__lib + 'config/defaults')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')
const RunnerInterface = require(__lib + 'runner-interface')
const ClusterFactory = require(__lib + 'cluster/cluster-factory')

describe('cluster-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)
    const cluster = ClusterFactory.create(metrics, logger, options)

    assert.ok(cluster instanceof RunnerInterface)
  })
})
