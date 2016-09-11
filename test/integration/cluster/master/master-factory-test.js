'use strict'

const assert = require('assert')
const RunnerInterface = require(__source + 'runner-interface')
const MasterFactory = require(__source + 'cluster/master/master-factory')

describe('master-factory', () => {
  it('.create() should return a Runner instance', () => {
    const master = MasterFactory.create()
    assert.ok(master instanceof RunnerInterface)
  })
})
