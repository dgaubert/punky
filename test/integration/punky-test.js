'use strict'

const Punky = require(__source + 'punky')
const Router = require('express').Router

describe('punky', () => {
  beforeEach(() => {
    this.router = Router()
    this.punky = new Punky()
  })

  it('service.run() should init the service', () => {
    this.punky.use(this.router)

    return this.punky.run()
      .then(() => {
        return this.punky.close()
      })
  })
})
