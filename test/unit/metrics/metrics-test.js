'use strict'

const assert = require('assert')
const sinon = require('sinon')
const MetricsInterface = require(__source + 'metrics/metrics-interface')
const LoggerInterface = require(__source + 'logger/logger-interface')
const Metrics = require(__source + 'metrics/metrics')

class MetricsProvider extends MetricsInterface {}
class Logger extends LoggerInterface {}

describe('metrics', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this.provider = new MetricsProvider()
    this.logger = new Logger()
    this.metrics = new Metrics(this.provider, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.timing() should sends a timing command with the specified milliseconds', () => {
    const metricsLogStub = this.sandbox.stub(this.provider, 'timing')
    const args = [ 'response_time', 42 ]

    this.metrics.timing(...args)

    assert.ok(metricsLogStub.calledWithExactly(...args))
  })

  it('.gauge() should gauge a stat by a specified amount', () => {
    const metricsLogStub = this.sandbox.stub(this.provider, 'gauge')
    const args = [ 'rss', 123.45 ]

    this.metrics.gauge(...args)

    assert.ok(metricsLogStub.calledWithExactly(...args))
  })
})
