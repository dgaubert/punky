'use strict'

const assert = require('assert')
const defaultOptions = require(__source + 'config/default')
const RunnerInterface = require(__source + 'runner-interface')
const LoggerFactory = require(__source + 'logger/logger-factory')
const MasterFactory = require(__source + 'cluster/master/master-factory')

describe('master-factory', () => {
  it('.create() should return a Runner instance', () => {
    const logger = LoggerFactory.create(defaultOptions)
    const master = MasterFactory.create(logger)

    assert.ok(master instanceof RunnerInterface)
  })
})
