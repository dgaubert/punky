'use strict'

const assert = require('assert')
const MetricsInterface = require(__lib + 'metrics/metrics-interface')

class Metrics extends MetricsInterface {}

describe('metrics-interface', () => {
  beforeEach(() => {
    this.metrics = new Metrics()
  })
  it('create interface directly with "new" should throw error', () => {
    assert.throws(() => new MetricsInterface(), 'MetricsInterface cannot be directly constructed')
  })

  it('.timing() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.metrics.timing(), 'Unimplemented method')
  })

  it('.gauge() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.metrics.gauge(), 'Unimplemented method')
  })

  it('.logOnError() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.metrics.logOnError(), 'Unimplemented method')
  })

  it('.gaugeMemory() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.metrics.gaugeMemory(), 'Unimplemented method')
  })
})
