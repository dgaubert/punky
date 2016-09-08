'use strict'

const FactoryInterface = require('../factory-interface')
const Metrics = require('./metrics')
const StatsD = require('node-statsd')

class MetricsFactory extends FactoryInterface {
  static create (logger, options) {
    const host = options.metrics.host
    const port = options.metrics.port
    const interval = options.metrics.interval
    const name = options.name
    const role = options.cluster.role
    const prefix = [ name, role ].join('.')
    const statsd = new StatsD(host, port, prefix)

    const metrics = new Metrics(statsd, logger)

    metrics.logOnError()
    metrics.gaugeMemory(interval)

    return metrics
  }
}

module.exports = MetricsFactory
