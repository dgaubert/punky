'use strict'

const RunnerInterface = require(__source + 'runner-interface')
const Punky = require(__source + 'punky')
const Router = require('express').Router

describe('punky', () => {
  beforeEach(() => {
    this.punky = new Punky()
  })

  it('.use() should return a Runner instance', () => {
    const service = this.punky.use()

    service.should.be.instanceOf(RunnerInterface)
  })

  it('service.run() should init the service', () => {
    const router = Router()

    const service = this.punky.use(router)

    return service.run()
      .then(() => {
        return service.close()
      })
  })
})
