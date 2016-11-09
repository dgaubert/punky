'use strict'

class MetricsInterface {
  constructor () {
    if (new.target === MetricsInterface) {
      throw new Error('MetricsInterface cannot be directly constructed')
    }
  }

  init () {
    throw new Error('Unimplemented method')
  }

  timing () {
    throw new Error('Unimplemented method')
  }

  gauge () {
    throw new Error('Unimplemented method')
  }

  logOnError () {
    throw new Error('Unimplemented method')
  }

  gaugeMemory () {
    throw new Error('Unimplemented method')
  }
}

module.exports = MetricsInterface
