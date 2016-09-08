'use strict'

const sinon = require('sinon')
const MetricsInterface = require(__source + 'metrics/metrics-interface')
const LoggerInterface = require(__source + 'logger/logger-interface')
const Metrics = require(__source + 'metrics/metrics')

describe('metrics', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this.provider = new MetricsInterface()
    this.logger = new LoggerInterface()
    this.metrics = new Metrics(this.provider, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.timing() should sends a timing command with the specified milliseconds', () => {
    const metricsLogStub = this.sandbox.stub(this.provider, 'timing')
    const args = [ 'response_time', 42 ]

    this.metrics.timing(...args)

    metricsLogStub.calledWithExactly(...args).should.equal(true)
  })

  it('.gauge() should gauge a stat by a specified amount', () => {
    const metricsLogStub = this.sandbox.stub(this.provider, 'gauge')
    const args = [ 'rss', 123.45 ]

    this.metrics.gauge(...args)

    metricsLogStub.calledWithExactly(...args).should.equal(true)
  })
})
