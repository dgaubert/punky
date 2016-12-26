'use strict'

const assert = require('assert')
const defaultOptions = require(__lib + 'config/default')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const LoggerFactory = require(__lib + 'logger/logger-factory')

describe('logger-factory', () => {
  it('.create() should return a Logger instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    assert.ok(logger instanceof LoggerInterface)
  })
})
