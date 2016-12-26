'use strict'

const assert = require('assert')
const LoggerInterface = require(__lib + 'logger/logger-interface')

class Logger extends LoggerInterface {}

describe('logger-interface', () => {
  beforeEach(() => {
    this.loggerInterface = new Logger()
  })

  it('.debug() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.loggerInterface.debug(), 'Unimplemented method')
  })

  it('.log() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.loggerInterface.log(), 'Unimplemented method')
  })

  it('.info() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.loggerInterface.info(), 'Unimplemented method')
  })

  it('.warn() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.loggerInterface.warn(), 'Unimplemented method')
  })

  it('.error() should throw "Unimplemented method" error', () => {
    assert.throws(() => this.loggerInterface.error(), 'Unimplemented method')
  })
})
