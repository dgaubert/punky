'use strict'

const defaultOptions = require(__source + 'config/default')
const LoggerFactory = require(__source + 'logger/logger-factory')
const Router = require('express').Router
const RunnerInterface = require(__source + 'runner-interface')
const WorkerFactory = require(__source + 'cluster/worker/worker-factory')

describe('worker-factory', () => {
  it('.create() should return a Runner instance', () => {
    const router = Router()
    const logger = LoggerFactory.create(defaultOptions)
    const worker = WorkerFactory.create(router, logger, defaultOptions)

    worker.should.be.instanceOf(RunnerInterface)
  })
})
