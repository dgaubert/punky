'use strict'

const defaultOptions = require(__source + 'config/default')
const LoggerInterface = require(__source + 'logger/logger-interface')
const LoggerFactory = require(__source + 'logger/logger-factory')

describe('logger-factory', () => {
  it('.create() should return a Logger instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    logger.should.be.instanceOf(LoggerInterface)
  })
})
