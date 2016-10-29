'use strict'

class MetricsInterface {
  constructor () {
    if (new.target === MetricsInterface) {
      throw new Error('MetricsInterface cannot be directly constructed')
    }
  }

  timing () {
    throw new Error('Unimplemented method')
  }

  gauge () {
    throw new Error('Unimplemented method')
  }
}

module.exports = MetricsInterface
