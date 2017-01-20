'use strict'

const assert = require('assert')
const DisabledMetrics = require(__lib + 'metrics/disabled-metrics')

describe('logger', () => {
  beforeEach(() => {
    this.metrics = new DisabledMetrics()
  })

  it('.timing() should do nothing', () => {
    assert.doesNotThrow(() => this.metrics.timing())
  })

  it('.gauge() should do nothing', () => {
    assert.doesNotThrow(() => this.metrics.gauge())
  })

  it('.logOnError() should do nothing', () => {
    assert.doesNotThrow(() => this.metrics.logOnError())
  })

  it('.gaugeMemory() should  do nothing', () => {
    assert.doesNotThrow(() => this.metrics.gaugeMemory())
  })
})
