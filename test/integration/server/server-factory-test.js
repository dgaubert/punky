'use strict'

const assert = require('assert')
const defaultOptions = require(__lib + 'config/default')
const RunnerInterface = require(__lib + 'runner-interface')
const HttpServerFactory = require(__lib + 'http-server/http-server-factory')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')

describe('server-factory', () => {
  it('.create() should return a Server instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)
    const httpServer = HttpServerFactory.create(metrics, logger, defaultOptions)

    assert.ok(httpServer instanceof RunnerInterface)
  })
})
