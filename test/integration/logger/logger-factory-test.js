'use strict'

const assert = require('assert')
const options = require(__lib + 'config/defaults')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const LoggerFactory = require(__lib + 'logger/logger-factory')

describe('logger-factory', () => {
  it('.create() should return a Logger instance', () => {
    const logger = LoggerFactory.create(options)
    assert.ok(logger instanceof LoggerInterface)
  })
})
