'use strict'

const Punky = require(__source + 'punky')

describe('punky', () => {
  beforeEach(() => {
    this.punky = new Punky()
  })

  it('service.run() should init the service', () => {
    return this.punky.run()
      .then(() => this.punky.close())
  })
})
