'use strict'

const assert = require('assert')
const Role = require(__source + 'cluster/role')

describe('role', () => {
  it('.isMaster() should return false', () => {
    const role = new Role(false)
    const isMaster = role.isMaster()

    assert.ok(!isMaster)
  })

  it('.isMaster() should return true', () => {
    const role = new Role(true)
    const isMaster = role.isMaster()

    assert.ok(isMaster)
  })

  it('.isWorker() should return true', () => {
    const role = new Role(false)
    const isWorker = role.isWorker()

    assert.ok(isWorker)
  })

  it('.isWorker() should return false', () => {
    const role = new Role(true)
    const isWorker = role.isWorker()

    assert.ok(!isWorker)
  })
})
