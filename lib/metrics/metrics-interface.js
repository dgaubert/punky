'use strict'

class MetricsInterface {
  timing () {
    throw new Error('Unimplemented method')
  }

  gauge () {
    throw new Error('Unimplemented method')
  }
}

module.exports = MetricsInterface
