'use strict'

const assert = require('assert')
const Role = require(__source + 'cluster/role')

describe('role', () => {
  it('.isMaster(!clusterOn) should return false', () => {
    const clusterOn = false
    const isMaster = Role.isMaster(clusterOn)

    assert.equal(isMaster, false)
  })

  it('.isMaster(clusterOn) should return true', () => {
    const clusterOn = true
    const isMaster = Role.isMaster(clusterOn)

    assert.equal(isMaster, true)
  })

  it('.isWorker(!clusterOn) should return true', () => {
    const clusterOn = false
    const isWorker = Role.isWorker(clusterOn)

    assert.equal(isWorker, true)
  })

  it('.isWorker(clusterOn) should return false', () => {
    const clusterOn = true
    const isWorker = Role.isWorker(clusterOn)

    assert.equal(isWorker, false)
  })
})
