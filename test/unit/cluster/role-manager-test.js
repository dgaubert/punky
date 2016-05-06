'use strict'

const RoleManager = require(__source + 'cluster/role-manager')

describe('role-manager', () => {
  it('.isMaster() should return false', () => {
    const roleManager = new RoleManager(false)
    const isMaster = roleManager.isMaster()

    isMaster.should.be.equal(false)
  })

  it('.isMaster() should return true', () => {
    const roleManager = new RoleManager(true)
    const isMaster = roleManager.isMaster()

    isMaster.should.be.equal(true)
  })

  it('.role() should return "worker"', () => {
    const roleManager = new RoleManager(false)
    const role = roleManager.role()

    role.should.be.equal('worker')
  })

  it('.role() should return "master"', () => {
    const roleManager = new RoleManager(true)
    const role = roleManager.role()

    role.should.be.equal('master')
  })
})
