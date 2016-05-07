'use strict'

const RunnerInterface = require(__source + 'runner-interface')
const MasterFactory = require(__source + 'cluster/master/master-factory')

describe('master-factory', () => {
  it('.create() should return a Runner instance', () => {
    const master = MasterFactory.create()
    master.should.be.instanceOf(RunnerInterface)
  })
})
