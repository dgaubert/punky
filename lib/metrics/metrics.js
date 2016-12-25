'use strict'

const MetricsInterface = require('./metrics-interface')

class Metrics extends MetricsInterface {
  constructor (metrics, interval, logger) {
    super()
    this.provider = metrics
    this.interval = interval
    this.logger = logger

    this.logOnError()
    this.gaugeMemory()
  }

  logOnError () {
    this.logger.debug('Log on error sending stats activated')
    this.provider.socket.on('error', err => this.logger.error('Error sending stats:', err))
  }

  gaugeMemory () {
    this.logger.debug('Gauge memory activated')
    this.memoryInterval = setInterval(() => {
      const memoryUsage = process.memoryUsage()
      Object.keys(memoryUsage).forEach(property => this.gauge('memory.' + property, memoryUsage[property]))
    }, this.interval)
  }

  timing () {
    this.provider.timing(...arguments)
  }

  gauge () {
    this.provider.gauge(...arguments)
  }

  increment () {
    this.provider.increment(...arguments)
  }
}

module.exports = Metrics
