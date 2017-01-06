'use strict'

const assert = require('assert')
const sinon = require('sinon')
const DisabledLogger = require(__lib + 'logger/disabled-logger')

describe('logger', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()
    this.logger = new DisabledLogger()
  })

  afterEach(() => {
    this.sandbox.restore()
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
