'use strict'

const assert = require('assert')
const DisabledLogger = require(__lib + 'logger/disabled-logger')

describe('logger', () => {
  beforeEach(() => {
    this.logger = new DisabledLogger()
  })

  it('.child() should do nothing', () => {
    assert.doesNotThrow(() => this.logger.child())
  })

  it('.reopenFileStreams() should do nothing', () => {
    assert.doesNotThrow(() => this.logger.reopenFileStreams())
  })

  it('.debug() should do nothing', () => {
    assert.doesNotThrow(() => this.logger.debug())
  })

  it('.log() should  do nothing', () => {
    assert.doesNotThrow(() => this.logger.log())
  })

  it('.info() should  do nothing', () => {
    assert.doesNotThrow(() => this.logger.info())
  })

  it('.warn() should do nothing', () => {
    assert.doesNotThrow(() => this.logger.warn())
  })

  it('.error() should do nothing', () => {
    assert.doesNotThrow(() => this.logger.error())
  })
})
