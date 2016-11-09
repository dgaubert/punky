'use strict'

const MetricsInterface = require('./metrics-interface')

class DisabledMetrics extends MetricsInterface {
  constructor (providerDisabled = false) {
    super()

    if (!providerDisabled) {
      this.provider = new DisabledMetrics(!providerDisabled)
    }
  }

  init () {}

  timing () {}

  gauge () {}

  logOnError () {}

  gaugeMemory () {}
}

module.exports = DisabledMetrics
