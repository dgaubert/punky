'use strict'

const RunnerInterface = require(__source + 'runner-interface')
const Punky = require(__source + 'punky')

describe('punky', () => {
  beforeEach(() => {
    this.punky = new Punky()
  })

  it('.use() should return a Runner instance', () => {
    const service = this.punky.use()

    service.should.be.instanceOf(RunnerInterface)
  })
})
