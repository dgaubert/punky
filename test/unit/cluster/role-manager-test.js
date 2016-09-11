'use strict'

const assert = require('assert')
const RoleManager = require(__source + 'cluster/role-manager')

describe('role-manager', () => {
  it('.isMaster() should return false', () => {
    const roleManager = new RoleManager(false)
    const isMaster = roleManager.isMaster()

    assert.ok(!isMaster)
  })

  it('.isMaster() should return true', () => {
    const roleManager = new RoleManager(true)
    const isMaster = roleManager.isMaster()

    assert.ok(isMaster)
  })

  it('.role() should return "worker"', () => {
    const roleManager = new RoleManager(false)
    const role = roleManager.role()

    assert.equal(role, 'worker')
  })

  it('.role() should return "master"', () => {
    const roleManager = new RoleManager(true)
    const role = roleManager.role()

    assert.equal(role, 'master')
  })
})
