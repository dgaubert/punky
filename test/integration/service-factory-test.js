'use strict'

const defaultOptions = require(__source + 'config/default')
const LoggerFactory = require(__source + 'logger/logger-factory')
const MetricsFactory = require(__source + 'metrics/metrics-factory')
const Router = require('express').Router
const RunnerInterface = require(__source + 'runner-interface')
const ServiceFactory = require(__source + 'service-factory')

describe('service-factory', () => {
  it('.create() should return a Runner instance', () => {
    const router = Router()
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)
    const service = ServiceFactory.create(router, metrics, logger, defaultOptions)
    service.should.be.instanceOf(RunnerInterface)
  })
})
