'use strict'

const defaultOptions = require(__source + 'config/default')
const LoggerFactory = require(__source + 'logger/logger-factory')
const Router = require('express').Router
const RunnerInterface = require(__source + 'runner-interface')
const ClusterFactory = require(__source + 'cluster/cluster-factory')

describe('cluster-factory', () => {
  it('.create() should return a Runner instance', () => {
    const router = Router()
    const logger = LoggerFactory.create(defaultOptions)
    const cluster = ClusterFactory.create(router, logger, defaultOptions)
    cluster.should.be.instanceOf(RunnerInterface)
  })
})
