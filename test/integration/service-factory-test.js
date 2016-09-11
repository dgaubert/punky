'use strict'

const assert = require('assert')
const defaultOptions = require(__source + 'config/default')
const RunnerInterface = require(__source + 'runner-interface')
const ServiceFactory = require(__source + 'service-factory')

describe('service-factory', () => {
  it('.create() should return a Runner instance', () => {
    const service = ServiceFactory.create(defaultOptions)
    assert.ok(service instanceof RunnerInterface)
  })
})
