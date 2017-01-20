'use strict'

const assert = require('assert')
const Punky = require(__lib + 'punky')
const Role = require(__lib + 'cluster/role')

describe('punky', () => {
  beforeEach(() => {
    this.punky = new Punky()
  })

  it('.run() should init the service', () => {
    return this.punky.run()
      .then(() => this.punky.close())
  })

  it('.close() should close the service', () => {
    return this.punky.run()
      .then(() => this.punky.close())
  })

  it(`.role should return ${Role.SERVER}`, () => {
    assert.equal(this.punky.role, Role.SERVER)
  })

  it('.logger should return a logger provider', () => {
    assert.doesNotThrow(() => this.punky.logger.debug())
    assert.doesNotThrow(() => this.punky.logger.info())
    assert.doesNotThrow(() => this.punky.logger.warn())
    assert.doesNotThrow(() => this.punky.logger.error())
  })

  it('.metrics should return a metrics instance', () => {
    assert.doesNotThrow(() => this.punky.metrics.timing())
    assert.doesNotThrow(() => this.punky.metrics.gauge())
    assert.doesNotThrow(() => this.punky.metrics.increment())
  })
})
