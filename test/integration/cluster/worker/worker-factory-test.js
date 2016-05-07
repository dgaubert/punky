'use strict'

const RunnerInterface = require(__source + 'runner-interface')
const WorkerFactory = require(__source + 'cluster/worker/worker-factory')

describe('worker-factory', () => {
  it('.create() should return a Runner instance', () => {
    const worker = WorkerFactory.create()
    worker.should.be.instanceOf(RunnerInterface)
  })
})
