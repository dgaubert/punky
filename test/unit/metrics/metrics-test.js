'use strict'

const assert = require('assert')
const sinon = require('sinon')
const MetricsInterface = require(__lib + 'metrics/metrics-interface')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const Metrics = require(__lib + 'metrics/metrics')

const GAUGE_MEMORY_INTERVAL = 1000

class MetricsProvider extends MetricsInterface {
  constructor () {
    super()
    this.socket = {
      on () {}
    }
  }
}

class Logger extends LoggerInterface {}

describe('metrics', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this.provider = new MetricsProvider()
    this.providerSocketMock = this.sandbox.mock(this.provider)

    this.logger = new Logger()
    this.metricsDebugStub = this.sandbox.stub(this.logger, 'debug')

    this.metrics = new Metrics(this.provider, GAUGE_MEMORY_INTERVAL, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.timing() should sends a timing command with the specified milliseconds', () => {
    const metricsTimingStub = this.sandbox.stub(this.provider, 'timing')
    const args = [ 'response_time', 42 ]

    this.metrics.timing(...args)

    assert.ok(metricsTimingStub.calledWithExactly(...args))
  })

  it('.gauge() should gauge a stat by a specified amount', () => {
    const args = [ 'rss', 123.45 ]
    const metricsGaugeStub = this.sandbox.stub(this.provider, 'gauge')

    this.metrics.gauge(...args)

    assert.ok(metricsGaugeStub.calledWithExactly(...args))
  })
})
