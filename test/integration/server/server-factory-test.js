'use strict'

const assert = require('assert')
const options = require(__lib + 'config/defaults')
const RunnerInterface = require(__lib + 'runner-interface')
const HttpServerFactory = require(__lib + 'http-server/http-server-factory')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')

describe('server-factory', () => {
  it('.create() should return a Server instance', () => {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)
    const httpServer = HttpServerFactory.create(metrics, logger, options)

    assert.ok(httpServer instanceof RunnerInterface)
  })
})
