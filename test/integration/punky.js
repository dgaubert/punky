'use strict'

const RunnerInterface = require(__source + 'runner-interface')
const Punky = require(__source + 'punky')

describe('punky', () => {
  it('.use() should return a Runner instance', () => {
    const punky = new Punky()
    const service = punky.use()

    service.should.be.instanceOf(RunnerInterface)
  })
})
