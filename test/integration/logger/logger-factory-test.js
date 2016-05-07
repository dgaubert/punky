'use strict'

const LoggerInterface = require(__source + 'logger-interface')
const LoggerFactory = require(__source + 'logger/logger-factory')

describe('logger-factory', () => {
  it('.create() should return a Logger instance', () => {
    const logger = LoggerFactory.create()
    logger.should.be.instanceOf(LoggerInterface)
  })
})
