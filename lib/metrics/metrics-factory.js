'use strict'

const FactoryInterface = require('../factory-interface')
const Role = require('../cluster/role')
const Metrics = require('./metrics')
const DisabledMetrics = require('./disabled-metrics')
const StatsD = require('node-statsd')

class MetricsFactory extends FactoryInterface {
  static create (logger, options) {
    if (!options.metrics.enabled) {
      return new DisabledMetrics()
    }

    const host = options.metrics.host
    const port = options.metrics.port
    const interval = options.metrics.interval
    const name = options.name
    const role = Role.get(options.cluster.enabled)
    const prefix = [ name, role ].join('.')
    const statsd = new StatsD(host, port, prefix)

    return new Metrics(statsd, interval, logger)
  }
}

module.exports = MetricsFactory
