'use strict'

const assert = require('assert')
const defaultOptions = require(__source + 'config/default')
const RunnerInterface = require(__source + 'runner-interface')
const HttpServerFactory = require(__source + 'http-server/http-server-factory')
const LoggerFactory = require(__source + 'logger/logger-factory')
const MetricsFactory = require(__source + 'metrics/metrics-factory')

describe('server-factory', () => {
  it('.create() should return a Server instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)
    const httpServer = HttpServerFactory.create(metrics, logger, defaultOptions)

    assert.ok(httpServer instanceof RunnerInterface)
  })
})
