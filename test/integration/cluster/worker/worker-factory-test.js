'use strict'

const assert = require('assert')
const options = require(__lib + 'config/defaults')
const LoggerFactory = require(__lib + 'logger/logger-factory')
const MetricsFactory = require(__lib + 'metrics/metrics-factory')
const Router = require('express').Router
const RunnerInterface = require(__lib + 'runner-interface')
const ServerFactory = require(__lib + 'cluster/server/server-factory')

describe('worker-factory', () => {
  it('.create() should return a Runner instance', () => {
    const router = Router()
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)
    const server = ServerFactory.create(router, metrics, logger, options)

    assert.ok(server instanceof RunnerInterface)
  })
})
