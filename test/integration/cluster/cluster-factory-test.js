'use strict'

const RunnerInterface = require(__source + 'runner-interface')
const ClusterFactory = require(__source + 'cluster/cluster-factory')

describe('cluster-factory', () => {
  it('.create() should return a Runner instance', () => {
    const cluster = ClusterFactory.create()
    cluster.should.be.instanceOf(RunnerInterface)
  })
})
