'use strict'

const assert = require('assert')
const Role = require(__lib + 'cluster/role')

describe('role', () => {
  it('.isLeader(!clusterOn) should return false', () => {
    const clusterOn = false
    const isLeader = Role.isLeader(clusterOn)

    assert.equal(isLeader, false)
  })

  it('.isLeader(clusterOn) should return true', () => {
    const clusterOn = true
    const isLeader = Role.isLeader(clusterOn)

    assert.equal(isLeader, true)
  })

  it('.isServer(!clusterOn) should return true', () => {
    const clusterOn = false
    const isServer = Role.isServer(clusterOn)

    assert.equal(isServer, true)
  })

  it('.isServer(clusterOn) should return false', () => {
    const clusterOn = true
    const isServer = Role.isServer(clusterOn)

    assert.equal(isServer, false)
  })
})
