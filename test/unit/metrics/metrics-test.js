'use strict'

const assert = require('assert')
const sinon = require('sinon')
const MetricsInterface = require(__lib + 'metrics/metrics-interface')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const Metrics = require(__lib + 'metrics/metrics')
const EventEmitter = require('events')

const GAUGE_MEMORY_INTERVAL = 1000

class MetricsProvider extends MetricsInterface {
  constructor () {
    super()
    this.socket = new EventEmitter()
  }

  timing () {}
  gauge () {}
  increment () {}
}

class Logger extends LoggerInterface {}

describe('metrics', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this.provider = new MetricsProvider()
    this.providerSocketMock = this.sandbox.mock(this.provider)

    this.logger = new Logger()
    this.loggerDebugStub = this.sandbox.stub(this.logger, 'debug')

    this.metrics = new Metrics(this.provider, GAUGE_MEMORY_INTERVAL, this.logger)
  })

  afterEach(() => {
    assert.ok(this.loggerDebugStub.called)
    this.sandbox.restore()
  })

  it('.timing() should sends a timing command with the specified milliseconds', () => {
    const metricsTimingStub = this.sandbox.stub(this.provider, 'timing')
    const args = [ 'response_time', 42 ]

    this.metrics.timing(...args)

    assert.ok(metricsTimingStub.calledWithExactly(...args))
  })

  it('should log when socket emits error', () => {
    const loggerErrorStub = this.sandbox.stub(this.logger, 'error')
    const error = new Error('something went wrong')

    this.metrics.provider.socket.emit('error', error)

    assert.ok(loggerErrorStub.calledOnce)
  })

  it('.gauge() should gauge a stat by a specified amount', () => {
    const args = [ 'rss', 123.45 ]
    const metricsGaugeStub = this.sandbox.stub(this.provider, 'gauge')

    this.metrics.gauge(...args)

    assert.ok(metricsGaugeStub.calledWithExactly(...args))
  })

  it('.increment() should increment a stat given a key', () => {
    const args = [ 'home' ]
    const metricsIncremetStub = this.sandbox.stub(this.provider, 'increment')

    this.metrics.increment(...args)

    assert.ok(metricsIncremetStub.calledWithExactly(...args))
  })
})
