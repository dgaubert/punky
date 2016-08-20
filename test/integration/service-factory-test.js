'use strict'

const defaultOptions = require(__source + 'config/default')
const LoggerFactory = require(__source + 'logger/logger-factory')
const Router = require('express').Router
const RunnerInterface = require(__source + 'runner-interface')
const ServiceFactory = require(__source + 'service-factory')

describe('service-factory', () => {
  it('.create() should return a Runner instance', () => {
    const router = Router()
    const logger = LoggerFactory.create(defaultOptions)
    const service = ServiceFactory.create(router, logger, defaultOptions)
    service.should.be.instanceOf(RunnerInterface)
  })
})
