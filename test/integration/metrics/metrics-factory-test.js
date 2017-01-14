'use strict'

const assert = require('assert')
const defaults = require(__lib + 'config/defaults')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const MetricsInterface = require(__lib + 'metrics/metrics-interface')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')

describe('metrics-factory', () => {
  it('.create() should return a Metrics instance', () => {
    const logger = LoggerFactory.create(defaults)

    const metrics = MetricsFactory.create(logger, defaults)

    assert.ok(metrics instanceof MetricsInterface)
  })

  it('.create() should return a Metrics instance when disabled', () => {
    const options = Object.assign({}, defaults, {
      metrics: {
        enabled: false
      }
    })
    const logger = LoggerFactory.create(options)

    const metrics = MetricsFactory.create(logger, options)

    assert.ok(metrics instanceof MetricsInterface)
  })
})
