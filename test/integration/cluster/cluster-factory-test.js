'use strict'

const defaultOptions = require(__source + 'config/default')
const LoggerFactory = require(__source + 'logger/logger-factory')
const MetricsFactory = require(__source + 'metrics/metrics-factory')
const Router = require('express').Router
const RunnerInterface = require(__source + 'runner-interface')
const ClusterFactory = require(__source + 'cluster/cluster-factory')

describe('cluster-factory', () => {
  it('.create() should return a Runner instance', () => {
    const router = Router()
    const logger = LoggerFactory.create(defaultOptions)
    const metrics = MetricsFactory.create(logger, defaultOptions)
    const cluster = ClusterFactory.create(router, metrics, logger, defaultOptions)
    cluster.should.be.instanceOf(RunnerInterface)
  })
})
