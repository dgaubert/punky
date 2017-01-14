'use strict'

const assert = require('assert')
const defaults = require(__lib + 'config/defaults')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const LoggerFactory = require(__lib + 'logger/logger-factory')

describe('logger-factory', () => {
  it('.create() should return a Logger instance', () => {
    const logger = LoggerFactory.create(defaults)

    assert.ok(logger instanceof LoggerInterface)
  })

  it('.create() should return a Logger instance when disabled', () => {
    const options = Object.assign({}, defaults, {
      logger: {
        enabled: false
      }
    })

    const logger = LoggerFactory.create(options)

    assert.ok(logger instanceof LoggerInterface)
  })
})
